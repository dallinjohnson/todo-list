const ListHeader = (headerText, actionText, action) => {
  let element;

  const init = () => {
    element = createElement();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.classList.add("list-header");

    const header = document.createElement("span");
    header.classList.add("title");
    header.textContent = headerText;

    container.appendChild(header);

    if (!headerText || !action) {
      return container;
    }

    const actionButton = document.createElement("span");
    actionButton.textContent = actionText;
    actionButton.classList.add("list-header-action");
    actionButton.addEventListener("click", action);

    container.appendChild(actionButton);
    return container;
  };

  init();

  return {
    getElement: () => element,
  };
};

export default ListHeader;
