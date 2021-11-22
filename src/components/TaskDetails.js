import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function TaskDetails() {
  return (
    <div className="card-details-page">
      <Card variant="outlined">
        <CardContent>
          <div className="entry-date">20.11.2021</div>
          <div className="task-title">
            List item 1
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