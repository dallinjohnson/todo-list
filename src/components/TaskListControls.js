import SortingCriteria from "../enums/SortingCriteria";
import pubsub from "../pubsub/PubSub";

class TaskListControls {
  constructor() {
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

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "Delete Task";
    deleteTaskButton.addEventListener("click", () => {
      pubsub.publish("deleteTask");
      pubsub.publish("numberOfTasksChanged");
    });

    const leftContainer = document.createElement("div");
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("button-group");

    leftContainer.append(sortLabel, sortSelect);
    rightContainer.append(deleteTaskButton);
    container.append(leftContainer, rightContainer);

    pubsub.publish("sortTasks", sortSelect.value);

    return container;
  }
}

export { TaskListControls };
