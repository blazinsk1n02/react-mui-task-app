import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Moment from 'react-moment';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as taskService from '../../services/taskService'
import { supabase } from '../../lib/supabaseClient'
import styles from './TaskDetails.module.css'

export default function TaskDetails() {
  const [task, setTask] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const { taskId } = useParams();

  useEffect(() => {
    taskService.getOne(taskId)
      .then(result => {
        setTask(...result);

        setIsComplete(result[0].is_complete);
      });
  }, [taskId]);
  
  const toggleTaskComplete = async (event) => {
    setIsComplete(event.target.checked);

    await supabase
      .from("tasks")
      .update({ is_complete: event.target.checked })
      .eq("id", task.id)
  };

  const dateToFormat = task.created_at;

  const handleChangeOnBlur = async (event) => {
    let note = event.target.value;

    const { error } = await supabase
      .from("tasks")
      .update({ note: note })
      .eq("id", task.id);

    if (error) throw error;
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