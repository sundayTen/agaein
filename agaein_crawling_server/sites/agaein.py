from database.database import get_db
from database.models import (
    Article,
    CrawlingOwnerResult,
    CrawlingPetResult,
    CrawlingSite,
    Lfg,
    Lfp,
)
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from sites.common.counting import crawling_counting


def convert_keyword(keyword):
    return keyword.keyword.keyword


def agaein_crawling(db: Session = next(get_db())):
    agaein = db.query(CrawlingSite).filter(CrawlingSite.site == "agaein").first()
    lfps = (
        db.query(Lfp).filter(Lfp.id > agaein.info["lfp"]).order_by(Lfp.id.desc()).all()
    )
    if lfps:
        agaein.info["lfp"] = lfps[0].id
        for lfp in lfps:
            if lfp.status == "DONE":
                print(f"[agaein] {lfp.article_id} 게시물은 종료되었습니다.")
                continue

            db_sink = dict()
            db_sink["type"] = lfp.breed.type
            db_sink["site"] = f"https://www.agaein.com/articleDetail/{lfp.article_id}"

            article = db.query(Article).filter(Article.id == lfp.article_id).first()

            db_sink["created_date"] = article.created_at
            db_sink["found_or_lost_date"] = lfp.lost_date
            if article.article_keywords:
                db_sink["keywords"] = (
                    "".join(list(map(convert_keyword, article.article_keywords)))
                    + lfp.feature
                    if lfp.feature
                    else ""
                ).replace(" ", "")
            elif lfp.feature:
                db_sink["keywords"] = lfp.feature.replace(" ", "")
            db_sink["breed"] = lfp.breed.breed
            db_sink["gender"] = lfp.gender if lfp.gender else "UNKNOWN"
            db_sink["age"] = lfp.age if lfp.age else None
            db_sink["name"] = lfp.name if lfp.name else None
            db_sink[
                "location"
            ] = f"{lfp.location.get('address')} {lfp.location.get('detail')}[{lfp.location.get('lat')},{lfp.location.get('lng')}]"

            crawling_result = CrawlingOwnerResult(
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
            print(f"[agaein] ------- {lfp.article_id} 게시물 크롤링 성공 -------")
    lfgs = (
        db.query(Lfg).filter(Lfg.id > agaein.info["lfg"]).order_by(Lfg.id.desc()).all()
    )
    if lfgs:
        agaein.info["lfg"] = lfgs[0].id

        for lfg in lfgs:
            if lfg.status == "DONE":
                print(f"[agaein] {lfg.article_id} 게시물은 종료되었습니다.")
                continue

            db_sink = dict()
            db_sink["type"] = lfg.breed.type
            db_sink["site"] = f"https://www.agaein.com/articleDetail/{lfg.article_id}"

            article = db.query(Article).filter(Article.id == lfg.article_id).first()

            db_sink["created_date"] = article.created_at
            db_sink["found_or_lost_date"] = lfg.found_date
            if article.article_keywords:
                db_sink["keywords"] = (
                    "".join(list(map(convert_keyword, article.article_keywords)))
                    + lfg.feature
                    if lfg.feature
                    else ""
                ).replace(" ", "")
            elif lfg.feature:
                db_sink["keywords"] = lfg.feature.replace(" ", "")
            db_sink["breed"] = lfg.breed.breed
            db_sink["gender"] = lfg.gender if lfg.gender else "UNKNOWN"
            db_sink["age"] = lfg.age if lfg.age else None
            db_sink["name"] = lfg.name if lfg.name else None
            db_sink[
                "location"
            ] = f"{lfg.location.get('address')} {lfg.location.get('detail')}[{lfg.location.get('lat')},{lfg.location.get('lng')}]"

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
            print(f"[agaein] ------- {lfg.article_id} 게시물 크롤링 성공 -------")

    flag_modified(agaein, "info")
    db.commit()
    crawling_counting()
