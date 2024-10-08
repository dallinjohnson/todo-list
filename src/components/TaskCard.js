import calendarIcon from "../assets/icons8-calendar-16.png";
import locationIcon from "../assets/icons8-location-16.png";
import descriptionIcon from "../assets/icons8-note-16.png";
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
      "Add Title",
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

    const dueDateContainer = document.createElement("div");
    dueDateContainer.className = "icon-group";
    const dueDateImg = document.createElement("img");
    dueDateImg.className = "icon";
    dueDateImg.src = calendarIcon;
    state.dueDate = document.createElement("span");
    const dateString = DateUtil.formatLong(state.task.dueDate);
    state.dueDate.textContent = dateString;
    dueDateContainer.append(dueDateImg, state.dueDate);

    const locationImg = document.createElement("img");
    locationImg.src = locationIcon;
    locationImg.className = "icon";
    state.location = Editable(
      "p",
      "location",
      state.task.location,
      "Add Location",
      handleEditableUpdate
    );
    const locationContainer = document.createElement("div");
    locationContainer.className = "icon-group";
    locationContainer.append(locationImg, state.location.getElement());

    const descriptionImg = document.createElement("img");
    descriptionImg.src = descriptionIcon;
    descriptionImg.className = "icon";
    state.description = Editable(
      "p",
      "description",
      state.task.description,
      "Add Description",
      handleEditableUpdate
    );
    const descriptionContainer = document.createElement("div");
    descriptionContainer.className = "icon-group";
    descriptionContainer.append(descriptionImg, state.description.getElement());

    const contentContainer = document.createElement("div");
    contentContainer.className = "task-card-content";
    contentContainer.append(
      dueDateContainer,
      locationContainer,
      descriptionContainer
    );

    fragment.append(headerRow, contentContainer);

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
