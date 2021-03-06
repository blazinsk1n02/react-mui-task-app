import { atom, selector } from 'recoil'
import * as taskService from '../services/taskService'

export const getAllState = atom({
	key: 'tasks',
	default: selector({
		key: 'getAllQuery',
		get: async () => {
			try {
				return await taskService.getAll()
			} catch (error) {
				throw error;
			}
		},
	}),
});