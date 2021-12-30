import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse';
import { useSnackbar } from 'notistack';

import { useRecoilState } from "recoil";

import TaskItem from '../TaskItem/TaskItem';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient'
import { getAllState } from '../../atoms/getAllState'

import styles from './TaskCard.module.css'

export default function TasksCard(
	shouldUpdate
) {
	const { enqueueSnackbar } = useSnackbar();
	const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useRecoilState(getAllState)

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

	const deleteTaskClickHandler = async (task) => {
		if (task.user_id === user?.id) {
			await supabase
				.from("tasks")
				.delete()
				.eq("id", task.id)
				.eq("user_id", user?.id);
		} else {
			customSnackbar('Not authorized!');
		}
	};

	const currentUserTasks = tasks.filter(task => {
		return task.user_id === user?.id
	})

	const altUserTasks = tasks.filter(task => {
		return task.user_id !== user?.id
	})

	return (
		<>
			<List>
				{currentUserTasks.map(x =>
					<TaskItem
						key={x.id}
						task={x}
						onDelete={deleteTaskClickHandler}
					/>)
				}
			</List>

			<p className={styles.cardHeading}>Team tasks</p>
			<List>
				{altUserTasks.map(x =>
					<TaskItem
						key={x.id}
						task={x}
						onDelete={deleteTaskClickHandler}
					/>)
				}
			</List>
		</>
	)
}