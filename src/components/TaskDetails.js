import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import * as taskService from '../services/taskService'

export default function TaskDetails({
  match
}) {

  const [task, setTask] = useState([]);

  useEffect(() => {
    taskService.getAll()
      .then(result => {
        setTask(result);
      });
  }, [])


  let selectedTask = task.filter(x => x.id == match.params.taskId)[0];
console.log(selectedTask)
  return (
    <div className="card-details-page">
      <Card variant="outlined">
        <CardContent>
          <div className="entry-date">20.11.2021</div>
          <div className="task-title">
            asdasd
          </div>
          <div>
            <small className="task-note">Task note</small>
          </div>
        </CardContent>
        <CardActions>
          <div className="btn-container">
            <Button variant="contained" size="large">
              Done
            </Button>
            <Button variant="contained" size="large">
              Delete
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}