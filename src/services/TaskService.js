const TaskService = () => {
  let tasks = [];

  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    tasks = savedTasks ? JSON.parse(savedTasks) : [];
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const generateId = () => {
    const ids = tasks.map((task) => task.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  };

  const findAll = () => [...tasks];

  const findById = (taskId) => tasks.find((task) => task.id === taskId);

  const findAllByProject = (projectId) =>
    tasks.find((task) => task.projectId === projectId);

  const deleteById = (taskId) => {
    const indexToDelete = tasks.findIndex((task) => task.id === taskId);
    if (indexToDelete !== -1) {
      tasks = tasks.filter((_, i) => i !== indexToDelete);
      saveTasks();
      return true;
    }
    return false;
  };

  const update = (updatedTask) => {
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      saveTasks();
      return true;
    }
    return false;
  };

  const insert = (task) => {
    const newTask = { ...task, id: generateId() };
    tasks.push(newTask);
    saveTasks();
    return newTask;
  };

  const setTasks = (newTasks) => {
    tasks = newTasks;
    saveTasks();
  };

  loadTasks();

  return {
    findAll,
    findById,
    findAllByProject,
    deleteById,
    update,
    insert,
    setTasks,
  };
};

const instance = TaskService();
export default instance;
