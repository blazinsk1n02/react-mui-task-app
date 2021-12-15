import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { useState, useContext } from 'react';
import TasksCard from './TasksCard';
import CreateTaskDialog from '../CreateTaskDialog';
import styles from './TaskCollection.module.css'

import { AuthContext } from '../../contexts/AuthContext';

export default function TaskCollection() {
  const [shouldReload, setShouldReload] = useState(false);
  const [taskDialog, setTaskDialog] = useState(false);
  const { user } = useContext(AuthContext);

  const handleClickOpen = () => {
    setTaskDialog(true);
  };

  const handleClose = () => {
    setTaskDialog(false);

    setShouldReload(true);
  };

  return (
    <div className={styles.taskCollection}>
      <h2>Good morning {user.email}!</h2>

      <TasksCard
        shouldUpdate={shouldReload}
      />

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