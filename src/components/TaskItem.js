import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';


export default function TaskItem({
  task,
  onDelete
}) {

  return (
    <>
      <Link
        to={`/tasks/${task.id}`}
        className="task-item-link">
        <ListItem
          sx={{ marginBottom: '5px' }}
          secondaryAction={
            <IconButton
              onClick={() => { onDelete(task.id) }}
              edge="end"
              aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
          disablePadding
          disableGutters
        >
          <ListItemButton dense>
            <ListItemText>{task.text}</ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    </>
  );
}