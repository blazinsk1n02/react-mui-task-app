import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Moment from 'react-moment';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as taskService from '../services/taskService'
import { supabase } from '../lib/supabaseClient'

export default function TaskDetails() {
  const [task, setTask] = useState([]);
  const { taskId } = useParams();

  useEffect(() => {
    taskService.getOne(taskId)
      .then(result => {
        setTask(...result);
      });
  }, [taskId]);
  
  const toggleTaskComplete = async (event) => {

    console.log('inside', event.target.checked)

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
    <div className="task-details">
      <Card variant="outlined">
        <CardContent>
          <div className="entry-date">
            <Moment date={dateToFormat} format="D MMM YYYY" />
          </div>
          <div className="task-title">
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
        <CardActions>
          <div className="btn-container">
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  onChange={toggleTaskComplete}
                />
              }
              label="Complete"
              labelPlacement="top"
            />
          </div>
        </CardActions>
      </Card>
    </div>
  )
}