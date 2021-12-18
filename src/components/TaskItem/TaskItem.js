import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import Collapse from '@mui/material/Collapse';
import { useSnackbar } from 'notistack';

import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import styles from './TaskItem.module.css'

import { supabase } from '../../lib/supabaseClient'
import * as taskService from '../../services/taskService'
import { AuthContext } from '../../contexts/AuthContext';

export default function TaskItem({
  task,
  onDelete
}) {
  
  const [currentTask, setCurrenTask] = useState(task);
	const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);

	const customSnackbar = (msg) => {
		enqueueSnackbar(msg, {
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center',
			},
			variant: 'error',
			persist: false,
			TransitionComponent: Collapse,
		});
	}

  const flagTask = async (currentTask) => {
    if (user.email) {
      await supabase
        .from("tasks")
        .update({ is_flagged: !currentTask.is_flagged })
        .eq("id", currentTask.id)

      taskService.getOne(currentTask.id)
        .then(result => {
          setCurrenTask(result[0])
        })

    } else {
      customSnackbar('Not authorized!');
    }
  }

  return (
    <>
      <ListItem
        className={styles.taskItem}
        sx={{ marginBottom: '5px' }}
        secondaryAction={
          <IconButton
            onClick={() => { onDelete(currentTask) }}
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
          onClick={() => { flagTask(currentTask) }}
          className={styles.flagIcon}
          edge="start"
          aria-label="flag task"
        >
          {currentTask.is_flagged
            ? <FlagIcon style={{ color: '#dc3545' }} />
            : <FlagIcon style={{ color: 'rgba(0, 0, 0, 0.26)' }} />
          }
        </IconButton>
        <Link
          to={`/tasks/${currentTask.id}`}
          className="task-item-link">
          <ListItemButton dense>
            <ListItemText>
              <div className={styles.taskTitle}>{currentTask.title}{currentTask.is_flagged}</div>
              <small className={styles.userEmail}>{currentTask.email}</small>
            </ListItemText>
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
}