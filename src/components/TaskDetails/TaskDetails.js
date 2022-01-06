import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Moment from 'react-moment';
import { useSnackbar } from 'notistack';

import { useRecoilState } from 'recoil';
import { getOneState } from '../../atoms/getOneState';
import { taskCompletion } from '../../atoms/taskCompletion';

import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient'
import styles from './TaskDetails.module.css'

import { userAtom } from '../../atoms/user';
import { useRecoilValue } from 'recoil';

export default function TaskDetails() {
  const user  = useRecoilValue(userAtom);
  const { enqueueSnackbar } = useSnackbar();
  const { taskId } = useParams();
  const [task, setTask] = useRecoilState(getOneState(taskId));
  const [isComplete, setIsComplete] = useRecoilState(taskCompletion(taskId));

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

      try {
        const { data } = await supabase
          .from("tasks")
          .update({ is_complete: event.target.checked })
          .eq("id", task.id)

        setIsComplete(data[0].is_complete)
      } catch (error) {
        console.log("error", error);
      }
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
              disabled={(user.id !== task.user_id) ? true : false}
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