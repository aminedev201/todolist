import { 
  Route,
  Routes 
} from 'react-router-dom';
import './App.css';
import MyTasks from './components/MyTasks';
import NotFound from './components/NotFound';
import { useState } from 'react';
import {TasksContext} from './contexts/TasksContext'

function App() {
    const [tasks ,setTasks] = useState([]);
    const [currentTasks , setCurrentTasks] = useState([]);
    const [filter, setFilter] = useState('all'); 
    
  return (
    <TasksContext.Provider value={{tasks,setTasks,currentTasks,setCurrentTasks,filter,setFilter}} >
      <div style={{ margin: '20px auto'}}>
        <Routes>
          <Route index element={<MyTasks />} />
          <Route path='/my-tasks' element={<MyTasks />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </TasksContext.Provider>
  );
}

export default App;