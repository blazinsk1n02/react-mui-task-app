import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse';
import { useSnackbar } from 'notistack';

import { useRecoilState, useRecoilValue } from "recoil";

import TaskItem from '../TaskItem/TaskItem';
import { supabase } from '../../lib/supabaseClient'
import { getAllState } from '../../atoms/getAllState'

import styles from './TaskCard.module.css'

import { userAtom } from '../../atoms/user';

export default function TasksCard() {
  const user  = useRecoilValue(userAtom);
	const { enqueueSnackbar } = useSnackbar();
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
			try {
				const { error, data } = await supabase
					.from("tasks")
					.delete()
					.eq("id", task.id)
					.eq("user_id", user?.id);

					const newTasks = tasks.filter(x => x.id !== task.id)
					setTasks(newTasks)
			} catch (error) {
				console.log("error", error);
			}
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