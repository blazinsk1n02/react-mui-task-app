import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './TaskItem.module.css'

import { supabase } from '../../lib/supabaseClient'
import * as taskService from '../../services/taskService'

export default function TaskItem({
  task,
  user,
  onDelete
}) {

  const [currentTask, setCurrenTask] = useState(task);

  const flagTask = async (id) => {
    await supabase
      .from("tasks")
      .update({ is_flagged: !currentTask.is_flagged })
      .eq("id", task.id)

    taskService.getOne(id)
      .then(result => {
        setCurrenTask(result[0])
      })
  }

  return (
    <>
      <ListItem
        className={styles.taskItem}
        sx={{ marginBottom: '5px' }}
        secondaryAction={
          <IconButton
            onClick={() => { onDelete(currentTask.id) }}
            edge="end"
            aria-label="delete"
            className={styles.deleteBtn}
          >
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
        disableGutters
      >
        <IconButton
          onClick={() => { flagTask(currentTask.id) }}
          className={styles.flagIcon}
          edge="start"
          aria-label="flag task"
        >
          {currentTask.is_flagged
            ? <FlagIcon style={{ color: '#dc3545' }} />
            : <FlagIcon style={{ color: 'rgba(0, 0, 0, 0.26)'}} />
          }
        </IconButton>
        <Link
          to={`/tasks/${currentTask.id}`}
          className="task-item-link">
          <ListItemButton dense>
            <ListItemText>
              <div className={styles.taskTitle}>{currentTask.title}{currentTask.is_flagged}</div>
              <small className={styles.userEmail}>{user}</small>
            </ListItemText>
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
}