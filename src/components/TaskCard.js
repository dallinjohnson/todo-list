import calendarIcon from "../assets/icons8-calendar-16.png";
import { DateUtil } from "../util/DateUtil";
import { Editable } from "./Editable";

const TaskCard = (task, handleUpdateTaskInfo, handleCheckbox) => {
  let state = {
    task: task,
    title: null,
    checkbox: null,
    dueDate: null,
    location: null,
    description: null,
    element: null,
  };

  const init = () => {
    state.element = document.createElement("div");
    state.element.className = "task-card";
    render();
  };

  const renderContent = () => {
    const fragment = document.createDocumentFragment();

    if (!state.task) {
      const noTaskMessage = document.createElement("p");
      noTaskMessage.textContent = "No task selected";
      fragment.appendChild(noTaskMessage);
      return fragment;
    }

    state.title = Editable(
      "h2",
      "title",
      state.task.title,
      "New Task",
      handleEditableUpdate
    );

    state.checkbox = document.createElement("div");
    state.checkbox.className = "checkbox";
    if (state.task.isCompleted) {
      state.checkbox.classList.add("checked");
    }
    state.checkbox.addEventListener("click", (e) => {
      handleCheckbox(e, state.task);
    });

    const headerRow = document.createElement("div");
    headerRow.className = "flex-row-space-between";
    headerRow.append(state.title.getElement(), state.checkbox);

    const dueDateContainer = document.createElement("span");
    const dueDateImg = document.createElement("img");
    dueDateImg.className = "icon";
    dueDateImg.src = calendarIcon;
    state.dueDate = document.createElement("span");
    const dateString = DateUtil.formatLong(state.task.dueDate);
    state.dueDate.textContent = dateString;
    dueDateContainer.append(dueDateImg, state.dueDate);

    state.location = Editable(
      "p",
      "location",
      state.task.location,
      "+ Add Location",
      handleEditableUpdate
    );

    state.description = Editable(
      "p",
      "description",
      state.task.description,
      "+ Add Description",
      handleEditableUpdate
    );

    fragment.append(
      headerRow,
      dueDateContainer,
      state.location.getElement(),
      state.description.getElement()
    );

    return fragment;
  };

  const render = () => {
    state.element.innerHTML = "";
    const content = renderContent();
    state.element.appendChild(content);
  };

  const update = (newTask) => {
    if (!newTask) {
      return;
    }

    if (state.task) {
      state.task = newTask;
      state.title.update(state.task.title);
      state.description.update(state.task.description);
      state.location.update(state.task.location);
      state.task.isCompleted
        ? state.checkbox.classList.add("checked")
        : state.checkbox.classList.remove("checked");
      state.dueDate.textContent = DateUtil.formatLong(state.task.dueDate);
      return;
    }

    state.task = newTask;
    render();
  };

  const handleEditableUpdate = (e) => {
    handleUpdateTaskInfo(e, state.task);
  };

  init();

  return {
    getElement: () => state.element,
    update,
  };
};

export { TaskCard };
