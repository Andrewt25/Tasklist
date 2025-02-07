from model import TaskList


# Converts TaskList object received from frontend into JSON serilizable format
def TaskList_to_Json(tasklist: TaskList) -> object:
    tasks = []
    for task in tasklist.tasks:
        tasks.append({"id": task.id, "item": task.item, "complete": task.complete})
    json_tasklist = {"name": tasklist.name, "tasks": tasks}
    return json_tasklist
