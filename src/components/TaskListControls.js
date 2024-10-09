class TaskListControls {
  constructor(handleSortTasks, handleNewTaskClick) {
    this.handleSortTasks = handleSortTasks;
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
    const options = [
      {
        value: "date",
        textContent: "Date",
        selected: true,
      },
      {
        value: "name",
        textContent: "Name",
        selected: false,
      },
    ];

    options.map((option) => {
      const el = document.createElement("option");
      el.textContent = option.textContent;
      el.value = option.value;
      if (option.selected) {
        el.selected = true;
      }
      sortSelect.appendChild(el);
    });
    sortSelect.addEventListener("change", this.handleSortTasks);

    const sortLabel = document.createElement("label");
    sortLabel.htmlFor = "task-sort-select";
    sortLabel.textContent = "Sort By";

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "New Task";
    newTaskButton.addEventListener("click", this.handleNewTaskClick);

    const leftContainer = document.createElement("div");
    leftContainer.append(sortLabel, sortSelect);
    container.append(leftContainer, newTaskButton);
    return container;
  }

  update() {}

  render() {}
}

export { TaskListControls };
