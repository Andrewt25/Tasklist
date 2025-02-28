import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  SxProps,
} from "@mui/material";
import { useRouter } from "next/router";
import SelectionCard from "@/components/selectionCard";
import React, { useEffect } from "react";

const boxStyle: SxProps = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
};

type Task = {
  id: number;
  item: string;
  complete: boolean;
};

const ListIndex = () => {
  const router = useRouter();
  const { opId, id } = router.query;
  const [text, setText] = React.useState<string>("");
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [name, setName] = React.useState<string>("");
  const [taskId, setTaskId] = React.useState<number>(0);
  const [listId, setListId] = React.useState<number>(0);

  useEffect(() => {
    if (id != null) {
      setListId(+id);
    }
    if (opId == "load") {
      fetch(`${process.env.HOST}:${process.env.PORT}/load?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTasks(data.tasks);
          setTaskId(data.tasks[data.tasks.length - 1].id);
        })
        .catch((error) => console.error(error));
    }
  }, [id, opId]);

  const createTask = (item: string) => {
    const nextId = taskId + 1;
    setTasks((tasks) => [...tasks, { id: nextId, item, complete: false }]);
    setTaskId(nextId);
  };

  const saveTaskList = async () => {
    console.log({ name: "some name", tasks: tasks });
    await fetch(`${process.env.HOST}:${process.env.PORT}/save?id=${listId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        tasks: tasks,
      }),
    })
      .then((response) => {
        response.json().then((responseData) => {
          const r = {
            status: response.status,
            body: responseData,
          };
          console.log(r.body);
          if (r.status == 422) {
            console.log("ERROR");
            console.error(r.body.detail);
          }
        });
      })

      .catch((error) => console.log(error));
  };

  const toggleComplete = (task: Task) => {
    setTasks((tasks) =>
      tasks.map((value) =>
        value.id === task.id ? { ...value, complete: !value.complete } : value
      )
    );
  };

  return (
    <Box sx={{ ...boxStyle, width: "100vw", height: "100vh" }}>
      <Box sx={{ ...boxStyle, width: "100vw", height: "80vh" }}>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <OutlinedInput
            id="name"
            label="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
        <List sx={{ width: "80vw" }}>
          {tasks.map((task) => {
            return (
              <ListItem key={task.id} divider disablePadding>
                <ListItemIcon>{`${task.id}.`}</ListItemIcon>
                <ListItemText
                  primary={task.item}
                  id={`item${task.id}`}
                  style={{
                    textDecoration: task.complete ? "line-through" : "none",
                  }}
                  slotProps={{
                    primary: {
                      fontSize: "20px",
                    },
                  }}
                />
                <ListItemIcon>
                  <Checkbox
                    checked={task.complete}
                    onClick={() => toggleComplete(task)}
                  />
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box sx={{ ...boxStyle, width: "100vw", height: "auto", gap: 1 }}>
        <FormControl>
          <InputLabel>Item</InputLabel>
          <OutlinedInput
            id="item"
            label="item"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </FormControl>
        <SelectionCard
          text="Add Item"
          action={() => createTask(text)}
        ></SelectionCard>
        <SelectionCard
          text="save"
          action={() => saveTaskList()}
        ></SelectionCard>
      </Box>
    </Box>
  );
};

export default ListIndex;
