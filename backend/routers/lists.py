from fastapi import APIRouter, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from model import TaskList, Task
import redis_helper

router = APIRouter()


@router.get("/load")
async def load_list(id: int = 1) -> TaskList:
    # get some list from db
    tasklist: TaskList = redis_helper.load_tasklist(id)
    return tasklist


@router.post("/save")
async def save_list(tasklist: TaskList, id: str | None = None):
    id = redis_helper.save_tasklist(tasklist, id)
    return id


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )
