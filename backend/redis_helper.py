import redis
import json
import os
from dotenv import load_dotenv
from model import TaskList, TaskIdentifier
from helper_functions import TaskList_to_Json

# Use localhost for faster testing
APP_ENV = os.getenv("APP_ENV")
load_dotenv(dotenv_path=f".env.{APP_ENV}")
r = redis.Redis(host=os.getenv("HOST"))


def health_check():
    print(r.ping())


def save_tasklist(tasks: TaskList, id: int = None) -> int:
    if id == None:
        id = r.incr("id", 1)
    json_tasklist = json.dumps(TaskList_to_Json(tasks))
    r.set(id, json_tasklist)
    return id


def load_tasklist(id: int) -> TaskList:
    tasklist: TaskList = json.loads(r.get(id))
    return tasklist


def load_all() -> list[TaskIdentifier]:
    taskIdentifiers: list[TaskIdentifier] = []
    for key in r.scan_iter():
        print(key)
        if key.decode() != "id":
            tasklist: TaskList = json.loads(r.get(key))
            taskIdentifiers.append({"id": key, "name": tasklist["name"]})
    return taskIdentifiers
