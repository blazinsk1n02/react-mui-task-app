import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Moment from 'react-moment';
import Collapse from '@mui/material/Collapse';
import { useSnackbar } from 'notistack';

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as taskService from '../../services/taskService'
import { supabase } from '../../lib/supabaseClient'
import styles from './TaskDetails.module.css'

import { AuthContext } from '../../contexts/AuthContext';

export default function TaskDetails() {
  const [task, setTask] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { taskId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    taskService.getOne(taskId)
      .then(result => {
        setTask(...result);

        setIsComplete(result[0].is_complete);
      });
  }, [taskId]);

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

  const toggleTaskComplete = async (event) => {
    if (user.id === task.user_id) {
      setIsComplete(event.target.checked);

      await supabase
        .from("tasks")
        .update({ is_complete: event.target.checked })
        .eq("id", task.id)
    } else {
      customSnackbar('Not authorized!');
    }
  };

  const dateToFormat = task.created_at;

  const handleChangeOnBlur = async (event) => {
    let note = event.target.value;

    await supabase
      .from("tasks")
      .update({ note: note })
      .eq("id", task.id);
  };

  return (
    <div className={styles.taskDetails}>
      <Card variant="outlined" className={styles.taskDetailsCard}>
        <CardContent>
          <div className={styles.taskDetailsEntryDate}>
            <Moment date={dateToFormat} format="D MMM YYYY" />
          </div>
          <div className={styles.taskDetailsTitle}>
            {task.title}
          </div>
          <div>
            <TextField
              onBlur={handleChangeOnBlur}
              defaultValue={task.note}
              multiline
              rows={3}
              placeholder="Enter note ..."
              fullWidth
              disabled={(user.id !== task.user_id)? true : false}
            />
          </div>
        </CardContent>
        <CardActions className={styles.taskDetailsBtnContainer}>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                onChange={toggleTaskComplete}
                checked={isComplete}
              />
            }
            label="Complete"
            labelPlacement="top"
          />
        </CardActions>
      </Card>
    </div>
  )
}