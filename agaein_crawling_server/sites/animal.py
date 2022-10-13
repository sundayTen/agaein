import re
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from database.database import get_db
from database.models import CrawlingOwnerResult, CrawlingPetResult, CrawlingSite
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from sites.common.kakaomap import getCoordinate

region_codes = {
    "4113": "서울특별시",
    "4263": "부산광역시",
    "4273": "대구광역시",
    "4283": "인천광역시",
    "4293": "광주광역시",
    "4303": "대전광역시",
    "4313": "울산광역시",
    "4414": "경기도",
    "4424": "강원도",
    "4434": "충청북도",
    "4444": "충청남도",
    "4454": "전라북도",
    "4464": "전라남도",
    "4474": "경상북도",
    "4484": "경상남도",
    "4506": "제주특별자치도",
    "4695": "세종특별자치시",
    # "4114": "서울특별시",
    # "4264": "부산광역시",
    # "4274": "대구광역시",
    # "4284": "인천광역시",
    # "4294": "광주광역시",
    # "4304": "대전광역시",
    # "4314": "울산광역시",
    # "4415": "경기도",
    # "4425": "강원도",
    # "4435": "충청북도",
    # "4445": "충청남도",
    # "4455": "전라북도",
    # "4465": "전라남도",
    # "4475": "경상북도",
    # "4485": "경상남도",
    # "4507": "제주특별자치도",
    # "4696": "세종특별자치시",
}

def convert(tag):
    if tag == None:
        return ""
    return str(tag).split('>')[1].split('</td')[0].strip()

def animal_crawling(db: Session = next(get_db())):

    animal = db.query(CrawlingSite).filter(CrawlingSite.site == "animal").first()
    regions = ["411301"]
    year = datetime.now().year

    for region_demo in region_codes.keys():
        for j in range(1, 200):
            region = str(int(region_demo) * 100 + j)
            start_idx = 1
            for i in range(start_idx, start_idx + 1):
                si = str(i)
                str_idx = "0" * (5 - len(si)) + si
                url = f"https://www.animal.go.kr/front/awtis/protection/protectionDtl.do?desertionNo={region}{year}{str_idx}"
                response = requests.get(url)

                html = response.text
                soup = BeautifulSoup(html, "html.parser")

                data = list(map(convert, soup.select("table")[0].select("td")))
                if len(data[0]) > 2:
                    animal.info[region] = 1
                    flag_modified(animal, "info")
                    db.commit()
                    print(region)
                    # print(data[1], data[3], data[4].split("(년생)")[0], data[5], data[6], data[7].replace(" ", ""), data[12][:2])