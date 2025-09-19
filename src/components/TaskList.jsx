import { Box, Typography } from "@mui/material";
import Task from "./Task";
import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export default function TasksList() {

  const {currentTasks} = useContext(TasksContext);

  if (!currentTasks || currentTasks.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 150, // gives some space
          bgcolor: "grey.100",
          borderRadius: 2,
          boxShadow: 1,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          There are no tasks here
        </Typography>
      </Box>
    );
  }

  return currentTasks.map((task) => <Task key={task.id} taskInfo={task} />
);
}
