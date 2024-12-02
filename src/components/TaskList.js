import TaskItem from "./TaskItem";
import { Task } from "../classes/Task";
import TaskService from "../services/TaskService";
import ProjectService from "../services/ProjectService";
import pubsub from "../pubsub/PubSub";
import { sortByTitle } from "../util/SortUtil";
import { sortByDate } from "../util/SortUtil";
import FilterCriteria from "../enums/FilterCriteria";
import SortingCriteria from "../enums/SortingCriteria";

const TaskList = () => {
  let tasks;
  let element;
  let sortingCriteria;
  let filterCriteria;
  let selectedTask;
  let selectedProject = ProjectService.findById(1);

  const init = () => {
    tasks = TaskService.findAll();
    element = createElement();

    pubsub.subscribe("sortTasks", (criteria) => {
      sortingCriteria = criteria;
      refreshTasks();
      render();
    });
    pubsub.subscribe("filterTasks", (criteria) => {
      filterCriteria = criteria;
      refreshTasks();
      render();
    });
    pubsub.subscribe("taskSelected", (newTask) => {
      selectedTask = newTask;
    });
    pubsub.subscribe("addNewTask", () => {
      const newTask = new Task();
      newTask.projectId = selectedProject.id;
      TaskService.insert(newTask);
      refreshTasks();
      render();
      pubsub.publish("numberOfTasksChanged");
    });
    pubsub.subscribe("projectSelected", (project) => {
      selectedProject = project;
      refreshTasks();
      render();
    });
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.classList.add("task-list");

    const taskItems = tasks.map((t) => TaskItem(t));
    taskItems.forEach((taskItem) =>
      container.appendChild(taskItem.getElement())
    );
    return container;
  };

  const refreshTasks = () => {
    const projectTasks = TaskService.findAllByProject(selectedProject.id);
    const filteredTasks = filterTasks(projectTasks);
    const sortedTasks = sortTasks(filteredTasks);
    tasks = sortedTasks;
    pubsub.publish("taskSelected", selectedTask);
  };

  const filterTasks = (tasks) => {
    if (!filterCriteria) {
      return tasks;
    }

    switch (filterCriteria) {
      case FilterCriteria.ALL:
        return tasks;
      case FilterCriteria.COMPLETED:
        return tasks.filter((task) => task.isCompleted);
      case FilterCriteria.INCOMPLETE:
        return tasks.filter((task) => !task.isCompleted);
      default:
        return;
    }
  };

  const sortTasks = (tasks) => {
    if (!sortingCriteria) {
      return tasks;
    }

    switch (sortingCriteria) {
      case SortingCriteria.DATE:
        return tasks.sort((a, b) => sortByDate(a.dueDate, b.dueDate));
      case SortingCriteria.TITLE:
        return tasks.sort((a, b) => sortByTitle(a.title, b.title));
      default:
        return tasks;
    }
  };

  const render = () => {
    element.innerHTML = "";
    element.append(...createElement().childNodes);
  };

  init();

  return {
    getElement: () => element,
  };
};

export { TaskList };
