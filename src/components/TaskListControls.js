import FilterCriteria from "../enums/FilterCriteria";
import SortingCriteria from "../enums/SortingCriteria";
import pubsub from "../pubsub/PubSub";

class TaskListControls {
  constructor(handleNewTaskClick) {
    this.handleNewTaskClick = handleNewTaskClick;
    this.element = this.createElement();
  }

  createElement() {
    // make container div
    const container = document.createElement("div");
    container.className = "task-list-controls";

    // make "sort by" dropdown
    const sortSelect = document.createElement("select");
    sortSelect.id = "task-sort-select";
    const sortOptions = [
      {
        value: SortingCriteria.DATE,
        textContent: "Date",
        selected: true,
      },
      {
        value: SortingCriteria.TITLE,
        textContent: "Title",
        selected: false,
      },
    ];

    sortOptions.map((option) => {
      const el = document.createElement("option");
      el.textContent = option.textContent;
      el.value = option.value;
      if (option.selected) {
        el.selected = true;
      }
      sortSelect.appendChild(el);
    });
    sortSelect.addEventListener("change", () => {
      pubsub.publish("sortTasks", sortSelect.value);
    });

    const sortLabel = document.createElement("label");
    sortLabel.htmlFor = "task-sort-select";
    sortLabel.textContent = "Sort By";

    const filterSelect = document.createElement("select");
    filterSelect.id = "task-filter-select";
    const filterOptions = [
      {
        value: FilterCriteria.ALL,
        textContent: "Show All",
        selected: true,
      },
      {
        value: FilterCriteria.INCOMPLETE,
        textContent: "Incomplete",
        selected: false,
      },
      {
        value: FilterCriteria.COMPLETED,
        textContent: "Completed",
        selected: false,
      },
    ];

    filterOptions.map((option) => {
      const el = document.createElement("option");
      el.textContent = option.textContent;
      el.value = option.value;
      if (option.selected) {
        el.selected = true;
      }
      filterSelect.appendChild(el);
    });

    filterSelect.addEventListener("change", () => {
      pubsub.publish("filterTasks", filterSelect.value);
    });

    const filterLabel = document.createElement("label");
    filterLabel.htmlFor = "task-filter-select";
    filterLabel.textContent = "Filter";

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "New Task";
    newTaskButton.addEventListener("click", this.handleNewTaskClick);

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "Delete Task";
    deleteTaskButton.addEventListener("click", () => {
      pubsub.publish("deleteTask");
    });

    const leftContainer = document.createElement("div");
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("button-group");

    leftContainer.append(sortLabel, sortSelect, filterLabel, filterSelect);
    rightContainer.append(newTaskButton, deleteTaskButton);
    container.append(leftContainer, rightContainer);
    return container;
  }

  update() {}

  render() {}
}

export { TaskListControls };
