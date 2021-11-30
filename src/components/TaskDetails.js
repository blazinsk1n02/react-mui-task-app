import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as taskService from '../services/taskService'

export default function TaskDetails() {
  const [task, setTask] = useState([]);
  const { taskId } = useParams();

  useEffect(() => {
    taskService.getOne(taskId)
      .then(result => {
        setTask(...result);
      });
  }, [taskId]);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  return (
    <div className="card-details-page">
      <Card variant="outlined">
        <CardContent>
          <div className="entry-date">{task.created_at}</div>
          <div className="task-title">
            {task.title}
          </div>
          <div>
            <TextField
              multiline
              rows={3}
              placeholder="Enter note ..."
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