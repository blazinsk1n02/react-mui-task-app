import { atomFamily, selectorFamily } from "recoil";
import { getAllState } from "./getAllState";

export const taskCompletion = atomFamily({
  key: 'taskCompletion',
  default: selectorFamily({
    key: 'defaultTaskCompletion',
    get: (taskId) => ({ get }) => {
      const allTasks = get(getAllState);

      const filterSelectedTask = allTasks.filter(x => {
        return (x.id).toString() === taskId;
      })

      return filterSelectedTask[0].is_complete
    },
  }),
});