import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { useState } from 'react';
import TasksCard from '../TaskCard/TasksCard';
import CreateTaskDialog from '../CreateTaskDialog';
import styles from './TaskCollection.module.css';

import { userAtom } from '../../atoms/user';
import { useRecoilValue } from 'recoil';

export default function TaskCollection() {
  const user  = useRecoilValue(userAtom);
  const [taskDialog, setTaskDialog] = useState(false);

  const handleClickOpen = () => {
    setTaskDialog(true);
  };

  const handleClose = () => {
    setTaskDialog(false);
  };

  return (
    <div className={styles.taskCollection}>
      {user.email
        ? <h2>Hello, <small>{user.email}</small>!</h2>
        : <h2>Hello!</h2>
      }

      <div className={
        user.email
          ? styles.userTaskContainer
          : styles.guestTaskContainer
      }>
        <TasksCard />
      </div>

      {user.email
        ? <>
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
        </>
        : null
      }
    </div>
  )
}