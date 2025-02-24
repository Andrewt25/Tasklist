from pydantic import BaseModel


class Task(BaseModel):
    id: int
    item: str
    complete: bool


class TaskList(BaseModel):
    name: str | None
    tasks: list[Task]


class TaskIdentifier(BaseModel):
    id: int
    name: str | None
