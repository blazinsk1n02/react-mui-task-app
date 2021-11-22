import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

import { useEffect, useState } from 'react';
import * as taskService from '../services/taskService'
import TaskItem from './TaskItem';

export default function TaskCollection() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {

    taskService.getAll()
      .then(result => {
        setTasks(result);
      })
  }, []);

  return (
    <List >
      <h2>Good morning Kiril,</h2>
      <h2>you have quite a busy schedule</h2>

      {tasks.map(x => <TaskItem key={x.id} task={x} />)}


      <IconButton color="primary" aria-label="add to shopping cart">
        <Icon
          baseClassName="fas"
          className="fa-plus-circle"
        />
      </IconButton>
    </List>
  )
}