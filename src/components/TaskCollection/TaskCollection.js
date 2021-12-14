import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { useEffect, useState, useContext } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import CreateTaskDialog from '../CreateTaskDialog';
import { supabase } from '../../lib/supabaseClient'
import * as taskService from '../../services/taskService'
import styles from './TaskCollection.module.css'

import { AuthContext } from '../../contexts/AuthContext';

export default function TaskCollection() {

  const [tasks, setTasks] = useState([]);
  const [taskDialog, setTaskDialog] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    taskService.getAll()
      .then(result => {
        setTasks(result);
      })
  }, [taskDialog]);

  const handleClickOpen = () => {
    setTaskDialog(true);
  };

  const handleClose = () => {
    setTaskDialog(false);
  };

  const deleteTaskClickHandler = async (id) => {
    try {
      await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);

      taskService.getAll()
        .then(result => {
          setTasks(result);
        })

    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={styles.taskCollection}>
      <h2>Good morning {user.email}!</h2>

      <List >
        {tasks.length > 0
          ? tasks.map(x =>
            <TaskItem
              key={x.id}
              task={x}
              onDelete={deleteTaskClickHandler}
            />)
          : <h2>You don't have any tasks yet.</h2>
        }
      </List>

      <div className={styles.btnContainer}>
        <IconButton
          onClick={handleClickOpen}
          color="primary"
          aria-label="add new task">
          <ControlPointIcon />
        </IconButton>
      </div>

      <CreateTaskDialog
        open={taskDialog}
        close={handleClose}
      />
    </div>
  )
}