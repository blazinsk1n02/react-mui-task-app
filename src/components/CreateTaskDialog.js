import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function CreateTaskDialog({
  open,
  close
}) {

  return (
    <div>
      <Dialog open={open} onClose={close} >
        <DialogTitle>Enter new task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newTask"
            label="New task"
            type="newTask"
            fullWidth
            variant="standard"
            sx={{ marginTop: '10px' }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="taskNote"
            label="Note"
            type="taskNote"
            fullWidth
            variant="standard"
            multiline
            maxRows={3}
            sx={{ marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <div className="btn-container">
            <Button size="large" >Add</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}