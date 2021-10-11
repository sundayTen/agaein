# 표준 라이브러리
from os import path, remove
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter
from fastapi.responses import FileResponse


router = APIRouter()
parent_route = path.dirname(path.abspath(path.dirname(__file__)))

@router.get("/file/image/{image}", tags=["image"], description="이미지 불러오기")
def get_image(
    image: str,
):
    try:
        open(f"{parent_route}/assets/image/{image}")
        return FileResponse(f"{parent_route}/assets/image/{image}")
    except Exception:
        return FileResponse(f"{parent_route}/assets/image/default.png")