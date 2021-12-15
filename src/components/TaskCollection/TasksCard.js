import List from '@mui/material/List'

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
	const { user } = useContext(AuthContext);

	useEffect(() => {
		taskService.getAll()
			.then(result => {
				setTasks(result);
			})
	}, [shouldUpdate]);

	const deleteTaskClickHandler = async (id) => {
		try {
			await supabase
				.from("tasks")
				.delete()
				.eq("id", id)
				.eq("user_id", user?.id);

			taskService.getAll()
				.then(result => {
					setTasks(result);
				})

		} catch (error) {
			console.log("error", error);
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
						user={x.email}
						onDelete={deleteTaskClickHandler}
					/>)
				}
			</List>
		</>
	)
}