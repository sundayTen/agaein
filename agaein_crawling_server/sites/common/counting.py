from datetime import datetime

from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from database.database import get_db
from database.models import CrawlingSite, CrawlingPetResult, CrawlingOwnerResult


def crawling_counting(db: Session = next(get_db())):
    date = str(datetime.now())[:10]
    total = db.query(CrawlingSite).filter(CrawlingSite.site == "total").first()
    total.info[date] = db.query(CrawlingPetResult.id).count() + db.query(CrawlingOwnerResult.id).count()
    flag_modified(total, "info")
    db.commit()
