import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse';
import { useSnackbar } from 'notistack';

import TaskItem from '../TaskItem/TaskItem';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient'
import * as taskService from '../../services/taskService'

import styles from './TaskCard.module.css'

export default function TasksCard(
	shouldUpdate
) {
	const [tasks, setTasks] = useState([]);
	const { enqueueSnackbar } = useSnackbar();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		taskService.getAll()
			.then(result => {
				setTasks(result);
			})
	}, [shouldUpdate]);

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

			taskService.getAll()
				.then(result => {
					setTasks(result);
				})

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
						assignee={x.email}
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
						assignee={x.email}
						onDelete={deleteTaskClickHandler}
					/>)
				}
			</List>
		</>
	)
}