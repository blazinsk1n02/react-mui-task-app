import { selectorFamily } from 'recoil'
import { getAllState } from './getAllState';

export const getOneState = selectorFamily({
  key: 'apiSingleTask',
  get: (taskId) => ({ get }) => {
    const allTasks = get(getAllState);

    const filterSelectedTask = allTasks.filter(x => {
      return (x.id).toString() === taskId;
    })
   
    return filterSelectedTask[0];
  },
})