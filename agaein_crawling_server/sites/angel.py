# 서드파티 라이브러리
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified
import requests

# 로컬 라이브러리
from database.database import get_db
from database.models import CrawlingSite, CrawlingPetResult
import re


def angel_crawling(db: Session = next(get_db())):

    angel = db.query(CrawlingSite).filter(CrawlingSite.site == "angel").first()
    codes = ["cat", "dog"]

    for code in codes:
        index = angel.info[f"{code}_index"]

        url = f"http://www.angel.or.kr/index.php?code={code}"
        response = requests.get(url)

        html = response.text
        soup = BeautifulSoup(html, "html.parser")

        end = int(
            str(soup.select(".main")[1].select(".gallery a")[0])
            .split("number")[1]
            .split("&")[0][1:]
        )

        fail_cnt = 0

        while index <= end:
            url = f"http://www.angel.or.kr/view.php?code={code}&number=" + str(index)
            response = requests.get(url)

            db_sink = dict()
            db_sink["type"] = code.upper();

            if response.status_code == 200:
                html = response.text
                soup = BeautifulSoup(html, "html.parser")

                try:
                    if re.split(r"[()]", str(soup.select(".about-header")[0]))[1][0:2] in ["목격", "구조"]:
                        pass
                    else:
                        print(f"[angel] {index}번째 게시물은 목격 및 구조 게시물이 아닙니다.")
                        continue

                    db_sink["site"] = url
                    db_sink["created_date"] = str(soup.select(".about-info")[0]).split("</em> ")[1].split(" ")[0]
                    db_sink["keywords"] = str(soup.select(".about-info")[0]).split("<br/>")[1][:-11].replace(" ", "")

                    data = soup.select(".left")
                    detail_data = re.split(r"[<>]", str(data[0]))[2].split(" / ")
                    db_sink["breed"] = detail_data[0]
                    db_sink["gender"] = "FEMALE" if detail_data[1] == "암컷" else ("MALE" if detail_data[1] == "수컷" else "UNKNOWN")
                    raw_age = detail_data[2].split("\n")[0]
                    str_age = ""
                    for sidx in raw_age:
                        if 47 < ord(sidx) < 58:
                            str_age += sidx

                    db_sink["age"] = None if str_age == "" else int(str_age)

                    if len(detail_data) > 3:
                        db_sink["name"] = re.split(r"[()]", detail_data[3])[1]

                    db_sink["found_date"] = re.split(r"[<>]", str(data[1]))[2]
                    db_sink["location"] = re.split(r"[<>]", str(data[2]))[2]
                    db_sink["keywords"] += re.split(r"[<>]", str(data[4]))[2].replace(" ", "")

                    crawling_pet_result = CrawlingPetResult(
                        type = db_sink.get("type"),
                        site = db_sink.get("site"),
                        created_date = db_sink.get("created_date"),
                        found_date = db_sink.get("found_date"),
                        keywords = db_sink.get("keywords"),
                        breed = db_sink.get("breed"),
                        gender = db_sink.get("gender"),
                        age = db_sink.get("age"),
                        name = db_sink.get("name"),
                        location = db_sink.get("location")
                    )

                    db.add(crawling_pet_result)

                    print(f"[angel] ------- {index}번째 게시물 크롤링 성공 -------")
                except:
                    print(f"[angel] {index}번째 게시물이 존재하지 않습니다.")
                finally:
                    index += 1
            else:
                fail_cnt += 1
                print(f"[angel] 크롤링 실패: {index}번째 게시물")

            if fail_cnt > 5:
                print("크롤링 실패 - 네트워크 에러")
                break

        angel.info[f"{code}_index"] = index
        flag_modified(angel, "info")
        db.commit()
