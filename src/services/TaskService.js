const TaskService = () => {
  let tasks = [];

  const generateId = () => {
    const ids = tasks.map((task) => task.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  };

  const findAll = () => [...tasks];

  const findById = (taskId) => tasks.find((task) => task.id === taskId);

  const deleteById = (taskId) => {
    const indexToDelete = tasks.findIndex((task) => task.id === taskId);
    if (indexToDelete !== -1) {
      tasks = tasks.filter((_, i) => i !== indexToDelete);
      return true;
    }
    return false;
  };

  const update = (updatedTask) => {
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      return true;
    }
    return false;
  };

  const insert = (task) => {
    const newTask = { ...task, id: generateId() };
    tasks.push(newTask);
    return newTask;
  };

  const setTasks = (newTasks) => {
    tasks = newTasks;
  };

  return { findAll, findById, deleteById, update, insert, setTasks };
};

const instance = TaskService();
export default instance;
