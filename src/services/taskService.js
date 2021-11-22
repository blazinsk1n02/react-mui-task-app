const API_URL = 'http://localhost:3030/jsonstore';


export const getAll = async () => {
  let response = await fetch(`${API_URL}/todos`);

  let tasks = await response.json();

  let result = Object.values(tasks)

  return result;
}

export const createTask = async (task) => {
  let response = await fetch(`${API_URL}/todos`, {
    //fetch() configuration
    method: 'POST',
    headers: {
      'content-type': 'application.json'
    },
    body: JSON.stringify(task)
  });

  let result = await response.json();

  return result;
}