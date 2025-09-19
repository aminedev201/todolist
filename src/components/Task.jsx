import { Box, Button, Card, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useContext, useState } from "react";
import { TasksContext } from "../contexts/TasksContext";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { localStorageService } from "../services/localStorageService";

export default function Task({ taskInfo }) {
  const { tasks, setTasks, setCurrentTasks, filter } = useContext(TasksContext);
  const [findTask, setFindTask] = useState({id:0,title:''});
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!taskInfo) return null;

  const updateCurrentTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    if (filter === "all") setCurrentTasks(updatedTasks);
    if (filter === "done")
      setCurrentTasks([...updatedTasks].filter((t) => t.isDone));
    if (filter === "notDone")
      setCurrentTasks([...updatedTasks].filter((t) => !t.isDone));
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = [...tasks].filter((t) => t.id !== id);
    updateCurrentTasks(updatedTasks);
    localStorageService.setJson('tasks',updatedTasks);
    setShowDeleteDialog(false); 
  }; 

  const handleChangeTaskStatus = (id) => {
    const updatedTasks = [...tasks].map((t) => t.id !== id ? t : { ...t, isDone: !t.isDone });
    updateCurrentTasks(updatedTasks);
    localStorageService.setJson('tasks',updatedTasks);
  };

  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setFindTask(task);
    setShowEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setShowEditDialog(false);
    setFindTask(null);
  };

  const handleDialogSave = () => {
    if(!findTask.title.trim()) return;
    const updatedTasks = tasks.map((t) =>t.id === findTask.id ? findTask : t);
    updateCurrentTasks(updatedTasks);
    localStorageService.setJson('tasks',updatedTasks);
    handleEditDialogClose();
  };

  return (
    <>
      <Card
        sx={{
          mb: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "primary.main",
          boxShadow: 4,
          borderRadius: 2,
          minHeight: 80,
          transition: "padding 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            py: 4,
            paddingTop: 4,
            boxShadow: 6,
          },
        }}
      >
        <Typography
          flex={1}
          variant="h6"
          sx={{ color: "white", fontWeight: "bold" ,   textDecoration: taskInfo?.isDone ? "line-through" : "none" }}
        >
          {taskInfo.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: 1,
          }}
        >
          <Button
            onClick={() => setShowDeleteDialog(true) }
            sx={{
              minWidth: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "white",
              color: "red",
              border: "1px solid red",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "grey.200",
                boxShadow: 4,
              },
            }}
          >
            <DeleteIcon />
          </Button>

          <Button
            onClick={() => handleEditTask(taskInfo.id)}
            sx={{
              minWidth: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "white",
              color: "blue",
              border: "1px solid blue",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "grey.200",
                boxShadow: 4,
              },
            }}
          >
            <EditIcon />
          </Button>

          <Button
            onClick={() => handleChangeTaskStatus(taskInfo.id)}
            sx={{
              minWidth: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "white",
              color: taskInfo.isDone ? "orange" : "green",
              border: taskInfo.isDone
                ? "1px solid orange"
                : "1px solid green",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "grey.200",
                boxShadow: 4,
              },
            }}
          >
            {taskInfo.isDone ? <RemoveCircleIcon /> : <DoneIcon />}
          </Button>
        </Box>
      </Card>

      {/* Dialog for editing task */}
      <Dialog open={showEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            value={findTask?.title || ""}
            onChange={(e) =>
              setFindTask({ ...findTask, title: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for confirming delete */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <b>{taskInfo?.title}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={() => handleDeleteTask(taskInfo.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
