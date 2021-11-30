import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
          <div className="entry-date">{task.created_at}</div>
          <div className="task-title">
            {task.title}
          </div>
          <div>
            <TextField
              onBlur={handleChangeOnBlur}
              multiline
              defaultValue={task.note}
              rows={3}
              placeholder="Enter note ..."
              fullWidth
            />
          </div>
        </CardContent>
        <CardActions>
          <div className="btn-container">
            <Button variant="contained" size="large">
              Complete
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}