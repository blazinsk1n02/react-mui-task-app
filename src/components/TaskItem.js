import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function TaskItem({
  task
}) {

  console.log(task)

  return (
    <>
      <ListItem
        sx={{ marginBottom: '5px' }}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
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
    </>
  );
}