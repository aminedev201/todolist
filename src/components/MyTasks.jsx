import {
  Box,
  Button,
  ButtonGroup,
  Card,
  TextField,
  Typography
} from '@mui/material';

import Container from '@mui/material/Container';
import TasksList from './TaskList';
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { TasksContext } from '../contexts/TasksContext';
import { localStorageService } from '../services/localStorageService';
import { useTheme } from "@mui/material/styles";


export default function MyTasks() {

  const { tasks, setTasks, setCurrentTasks, filter, setFilter} = useContext(TasksContext);
  
  const [taskTitle, setTaskTitle] = useState('');

  const theme = useTheme();


  useEffect(() => {
    const TasksStorage = localStorageService.getJson("tasks");
      setTasks(TasksStorage);
      setCurrentTasks(TasksStorage);
  },[]);

  // handle button clicks
  const handleFilter = (type) => {
    setFilter(type);
    if (type === 'all') setCurrentTasks(tasks);
    if (type === 'done') setCurrentTasks([...tasks].filter(t => t.isDone));
    if (type === 'notDone') setCurrentTasks([...tasks].filter(t => !t.isDone));
  }

  const addNewTask = () => {
    const taskTitleVal = taskTitle.trim();
    if (taskTitleVal === '') return;
    const updatedTasks = [...tasks,{ id: uuidv4(), title: taskTitleVal, isDone: false }];
    setTasks(updatedTasks);
    localStorageService.setJson('tasks',updatedTasks);
    setTaskTitle('');

    if (filter === 'all') setCurrentTasks(updatedTasks);
    if (filter === 'done') setCurrentTasks([...updatedTasks].filter(t => t.isDone));
    if (filter === 'notDone') setCurrentTasks([...updatedTasks].filter(t => !t.isDone));

  }

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
              onClick={() => handleFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'done' ? 'contained' : 'outlined'}
              onClick={() => handleFilter('done')}
            >
              Done
            </Button>
            <Button
              variant={filter === 'notDone' ? 'contained' : 'outlined'}
              onClick={() => handleFilter('notDone')}
            >
              Not Done
            </Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ my: 5 }}>
          <TasksList/>

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
    </Container>
  );
}
