import TaskItem from "./TaskItem";
import TaskService from "../services/TaskService";
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

  const init = () => {
    tasks = TaskService.findAll();
    element = createElement();

    pubsub.subscribe("sortTasks", (criteria) => {
      sortingCriteria = criteria;
      filterSortTasks();
    });
    pubsub.subscribe("filterTasks", (criteria) => {
      filterCriteria = criteria;
      filterSortTasks();
    });
    pubsub.subscribe("taskSelected", (newTask) => {
      selectedTask = newTask;
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

  const filterSortTasks = () => {
    tasks = TaskService.findAll();
    const filteredTasks = filterTasks();
    tasks = filterTasks();
    const sortedTasks = sortTasks();
    render();
    pubsub.publish("taskSelected", selectedTask);
  };

  const filterTasks = () => {
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

  const sortTasks = () => {
    if (!sortingCriteria) {
      return;
    }

    switch (sortingCriteria) {
      case SortingCriteria.DATE:
        return tasks.sort((a, b) => sortByDate(a.dueDate, b.dueDate));
      case SortingCriteria.TITLE:
        return tasks.sort((a, b) => sortByTitle(a.title, b.title));
      default:
        return;
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
