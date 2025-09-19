import {
  Box,
  Button,
  ButtonGroup,
  Card,
  TextField,
  Typography
} from '@mui/material';

import Container from '@mui/material/Container';
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { TasksContext } from '../contexts/TasksContext';
import { localStorageService } from '../services/localStorageService';
import { useTheme } from "@mui/material/styles";
import Task from './Task';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function MyTasks() {

  const { tasks, setTasks} = useContext(TasksContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [filter, setFilter] = useState('all'); 
  const [findTask, setFindTask] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowUpdateDialog] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    const TasksStorage = localStorageService.getJson("tasks");
      setTasks(TasksStorage);
  },[]);

  const addNewTask = () => {
    const taskTitleVal = taskTitle.trim();
    if (taskTitleVal === '') return;
    const updatedTasks = [...tasks,{ id: uuidv4(), title: taskTitleVal, isDone: false }];
    setTasks(updatedTasks);
    localStorageService.setJson('tasks',updatedTasks);
    setTaskTitle('');
  }

  const handleDeleteTask = () => {
    if (!findTask || !findTask?.title.trim()) return;
    const updatedTasks = [...tasks].filter((t) => t.id !== findTask.id);
    setTasks(updatedTasks);
    localStorageService.setJson('tasks', updatedTasks);
    setShowDeleteDialog(false);
  };

  const openDeleteDialog = (task) => {
    setFindTask(task);
    setShowDeleteDialog(true);
  }
  const openUpdateDialog = (task) => {
    setFindTask(task);
    setShowUpdateDialog(true);
  }

  const handleEditDialogClose = () => {
    setShowUpdateDialog(false);
    setFindTask(null);
  };

  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
    setFindTask(null);
  };

  const handleDialogSave = () => {
    if (!findTask || !findTask?.title.trim()) return;
    const updatedTasks = tasks.map((t) => t.id === findTask.id ? findTask : t);
    setTasks(updatedTasks);
    localStorageService.setJson('tasks', updatedTasks);
    handleEditDialogClose();
  };

  const handleChangeTaskStatus = (task) => {
    if (!task || !task?.title.trim()) return;
    const updatedTasks = [...tasks].map((t) => t.id !== task.id ? t : { ...t, isDone: !t.isDone });
    setTasks(updatedTasks);
    localStorageService.setJson('tasks', updatedTasks);
  };

  const doneTasks = useMemo(() => {
    return tasks.filter(t => t.isDone);
  },[tasks]);

  const notDoneTasks = useMemo(() => {
    return tasks.filter(t => !t.isDone);
  },[tasks]);

  let currentTasks = tasks;

  if(filter === 'done') currentTasks = doneTasks;
  if(filter === 'notDone') currentTasks = notDoneTasks;

  const tasksJsx = currentTasks.map((task) => <Task key={task.id} taskInfo={task} handleChangeTaskStatus={handleChangeTaskStatus} openDeleteDialog={openDeleteDialog} openUpdateDialog={openUpdateDialog} />);

  return (
    <Container maxWidth="md">
      <Card sx={{ padding: '20px' , maxHeight:'85vh',overflow:'auto'}} >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{
            borderBottom: "2px solid #ddd",
            pb: 1, // padding bottom
            color: theme.palette.primary.main,
          }}

        >
          My Tasks
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 5,
          }}
        >
          <ButtonGroup size="large" aria-label="basic button group">
            <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'done' ? 'contained' : 'outlined'}
              onClick={() => setFilter('done')}
            >
              Done
            </Button>
            <Button
              variant={filter === 'notDone' ? 'contained' : 'outlined'}
              onClick={() => setFilter('notDone')}
            >
              Not Done
            </Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ my: 5 }}>
          {!currentTasks || currentTasks.length === 0 ? (
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
            ) : tasksJsx}
        </Box>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField sx={{ flex: 1 }} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} id="outlined-basic" label='Task Title' variant="outlined" />
          <Button
            onClick={addNewTask}
            sx={{ width: "120px" }}
            variant="contained"
            startIcon={<AddIcon />}
            disabled={taskTitle.trim() === ''}
          >
            add
          </Button>
        </Box>
      </Card>

      {/* Dialog for confirming delete */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        fullWidth
        maxWidth="xs"
        // Make dialog responsive
        PaperProps={{
          sx: {
            m: { xs: 1, sm: 3 },
            width: { xs: "calc(100% - 16px)", sm: "100%" },
          }
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ wordWrap: "break-word" }}>
            Are you sure you want to delete this task ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button
            onClick={handleDeleteTask}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

            {/* Dialog for editing task */}
      <Dialog
        open={showEditDialog}
        onClose={handleEditDialogClose}
        fullWidth
        maxWidth="sm"
        // Make dialog responsive
        PaperProps={{
          sx: {
            m: { xs: 1, sm: 3 },
            width: { xs: "calc(100% - 16px)", sm: "100%" },
          }
        }}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            multiline
            maxRows={3}
            value={findTask?.title || ""}
            onChange={(e) =>
              setFindTask({ ...findTask, title: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button
            onClick={handleDialogSave}
            variant="contained"
            disabled={findTask?.title.trim() === ''}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
