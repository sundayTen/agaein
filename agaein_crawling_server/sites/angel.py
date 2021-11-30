# 서드파티 라이브러리
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified
import requests

# 로컬 라이브러리
from database.database import get_db
from database.models import CrawlingSite


# @TODO 로깅 넣기
def angel_crawling(db: Session = next(get_db())):

    angel = db.query(CrawlingSite).filter(CrawlingSite.site == "angel").first()
    index = angel.info["index"]

    url = "http://www.angel.or.kr/index.php?code=cat"
    response = requests.get(url)

    html = response.text
    soup = BeautifulSoup(html, "html.parser")

    end = int(
        str(soup.select(".main")[1].select(".gallery a")[0])
        .split("number")[1]
        .split("&")[0][1:]
    )

    fail_cnt = 0

    # @TODO 여기 삭제 요망 - 더미 데이터 테스트 용도
    index = 10933

    while index <= end:
        url = "http://www.angel.or.kr/view.php?code=cat&number=" + str(index)
        response = requests.get(url)

        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, "html.parser")
            try:
                raw_location = str(soup.select(".style")[0]).split("(")[1]
                if raw_location[0] == "목" or raw_location[0] == "구":
                    location = raw_location[6:-5]
                    print(f"[angel] {index}번째 게시물: {location}")
            except:
                print("[angel] ------- 존재하지 않는 게시물 입니다. -------")
            finally:
                index += 1
        else:
            fail_cnt += 1
            print(f"[angel] 크롤링 실패: {index}번째 게시물")

        if fail_cnt > 5:
            print("크롤링 실패 - 네트워크 에러")
            break

    angel.info["index"] = index
    flag_modified(angel, 'info')
    db.commit()
