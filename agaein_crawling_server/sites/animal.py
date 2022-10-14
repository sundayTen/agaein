from datetime import datetime

import requests
from bs4 import BeautifulSoup
from database.database import get_db
from database.models import CrawlingPetResult, CrawlingSite
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from sites.common.kakaomap import getCoordinate

region_codes = {
    "411": "서울특별시",
    "426": "부산광역시",
    "427": "대구광역시",
    "428": "인천광역시",
    "429": "광주광역시",
    "430": "대전광역시",
    "431": "울산광역시",
    "441": "경기도",
    "442": "강원도",
    "443": "충청북도",
    "444": "충청남도",
    "445": "전라북도",
    "446": "전라남도",
    "447": "경상북도",
    "448": "경상남도",
    "450": "제주특별자치도",
    "469": "세종특별자치시",
}


def convert(tag):
    if tag == None:
        return ""
    return str(tag).split(">")[1].split("</td")[0].strip()


def animal_crawling(db: Session = next(get_db())):
    animal = db.query(CrawlingSite).filter(CrawlingSite.site == "animal").first()
    year = datetime.now().year

    for region in animal.info.keys():
        found_idx = animal.info[region]
        idx = found_idx + 1
        end = idx + 30
        fail_cnt = 0
        while idx < end:
            si = str(idx)
            str_idx = "0" * (5 - len(si)) + si
            url = f"https://www.animal.go.kr/front/awtis/protection/protectionDtl.do?desertionNo={region}{year}{str_idx}"
            response = requests.get(url)

            if response.status_code == 200:
                html = response.text
                soup = BeautifulSoup(html, "html.parser")

                data = list(map(convert, soup.select("table")[0].select("td")))
                if len(data[0]) > 2:
                    found_idx = idx
                    if data[12][:2] == "종료":
                        idx += 1
                        print(f"[animal] {region}{year}{str_idx} 게시물은 종료되었습니다.")
                        continue

                    type_and_breed = data[1].split("]")
                    if len(type_and_breed) < 2 or type_and_breed[0] not in [
                        "[개",
                        "[고양이",
                    ]:
                        idx += 1
                        print(f"[animal] {region}{year}{str_idx} 게시물은 잘못된 게시물입니다.")
                        continue

                    db_sink = dict()

                    db_sink["type"] = "DOG" if type_and_breed[0] == "[개" else "CAT"
                    db_sink["breed"] = type_and_breed[1]
                    db_sink["found_or_lost_date"] = data[6]
                    db_sink["created_date"] = data[6]
                    db_sink["keywords"] = data[8].replace(" ", "") if data[7].replace(" ", "") in ["예", "아니오"] else data[7].replace(" ", "")
                    location = region_codes.get(region[:3]) + " " + data[5]
                    db_sink["location"] = location + getCoordinate(location + " ")
                    born_year = data[4].split("(년생)")[0]
                    db_sink["age"] = (
                        int(year) - int(born_year) + 1 if len(born_year) == 4 else None
                    )
                    db_sink["gender"] = (
                        "FEMALE"
                        if data[3] == "암컷"
                        else ("MALE" if data[3] == "수컷" else "UNKNOWN")
                    )
                    db_sink["site"] = url

                    crawling_result = CrawlingPetResult(
                        type=db_sink.get("type"),
                        site=db_sink.get("site"),
                        created_date=db_sink.get("created_date"),
                        found_or_lost_date=db_sink.get("found_or_lost_date"),
                        keywords=db_sink.get("keywords"),
                        breed=db_sink.get("breed"),
                        gender=db_sink.get("gender"),
                        age=db_sink.get("age"),
                        name=db_sink.get("name"),
                        location=db_sink.get("location"),
                    )

                    db.add(crawling_result)

                    print(
                        f"[animal] ------- {region}{year}{str_idx} 게시물 크롤링 성공 -------"
                    )
                idx += 1
            else:
                fail_cnt += 1
                print(f"[animal] 크롤링 실패: {region}{year}{str_idx} 게시물")

            if fail_cnt > 5:
                print("크롤링 실패 - 네트워크 에러")
                break

        if found_idx != animal.info[region]:
            animal.info[region] = found_idx
            flag_modified(animal, "info")
            db.commit()
