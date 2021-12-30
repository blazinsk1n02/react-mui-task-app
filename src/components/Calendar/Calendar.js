import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import moment from 'moment';

import { useState } from 'react'
import { useRecoilState } from "recoil";

import { getAllState } from '../../atoms/getAllState'
import styles from './Calendar.module.css'

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useRecoilState(getAllState);

  const onDateChange = (newDate) => {
    const formatSelectedDate = moment(newDate._d).format('DD/MM/YYYY');

    const selectedDateTasks = tasks.filter(x => {
      return moment(x.created_at).format('DD/MM/YYYY') === formatSelectedDate
    });
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