import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

import TaskItem from './TaskItem';

export default function TaskCollection() {
  return (
    <List >
      <h2>Good morning Kiril,</h2>
      <h2>you have quite a busy schedule</h2>
      <TaskItem />

      <IconButton color="primary" aria-label="add to shopping cart">
      <Icon
        baseClassName="fas"
        className="fa-plus-circle"
      />
      </IconButton>
    </List>
  )
}