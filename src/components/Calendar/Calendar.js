import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import moment from 'moment';

import { useState, useEffect } from 'react'
import * as taskService from '../../services/taskService'
import styles from './Calendar.module.css'

export default function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    taskService.getAll()
      .then(result => {
        setTasks(result);
      });
  }, []);

  const onDateChange = (newDate) => {
    const formatSelectedDate = moment(newDate).format('DD/MM/YYYY');

    const serverDateFormat = tasks.filter(x => {
      return moment(x.created_at).format('DD/MM/YYYY') === formatSelectedDate
    });

    console.log(serverDateFormat)
  };


  return (
    <div className={styles.calendar}>
      <StaticDatePicker
        orientation="portrait"
        openTo="day"
        value={date}
        shouldDisableDate={isWeekend}
        onChange={onDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  )
}