import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { supabase } from '../lib/supabaseClient'
import { useState, useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export default function CreateTaskDialog({
  open,
  close
}) {

  const [newTask, setNewTask] = useState({
    title: '',
    note: ''
  });
  const { user } = useContext(AuthContext);

  const changeHandler = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await supabase
        .from('tasks')
        .insert([
          {
            title: newTask.title,
            note: newTask.note,
            user_id: user.id,
            is_complete: false
          }
        ])
    } catch (error) {
      console.log("error", error);
    }

    setNewTask({ title: '', note: '' });
  }

  return (
    <div>
      <Dialog open={open} onClose={close} >
        <DialogTitle>Enter new task</DialogTitle>
        <form method="POST" onSubmit={submitHandler}>
          <DialogContent>
            <TextField
              name="title"
              onChange={changeHandler}
              value={newTask.title}
              label="New task"
              autoFocus
              fullWidth
              margin="dense"
              variant="standard"
              sx={{ marginTop: '10px' }}
            />
            <TextField
              name="note"
              onChange={changeHandler}
              value={newTask.note}
              label="Note"
              fullWidth
              margin="dense"
              multiline
              variant="standard"
              maxRows={3}
              sx={{ marginTop: '20px' }}
            />
          </DialogContent>
          <DialogActions>
            <div className="btn-container">
              <Button
                size="large"
                type="submit"
              >
                Add
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}