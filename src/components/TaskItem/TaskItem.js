import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

import styles from './TaskItem.module.css'

export default function TaskItem({
  task,
  user,
  onDelete
}) {

  return (
    <>
      <ListItem
        className={styles.taskItem}
        sx={{ marginBottom: '5px' }}
        secondaryAction={
          <IconButton
            onClick={() => { onDelete(task.id) }}
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
        <Link
          to={`/tasks/${task.id}`}
          className="task-item-link">
          <ListItemButton dense>
            <ListItemText>
              <div className={styles.taskTitle}>{task.title}</div>
              <small className={styles.userEmail}>{user}</small>
            </ListItemText>
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
}