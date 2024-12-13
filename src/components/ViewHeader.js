const ViewHeader = (headerText, sortDropdown) => {
  let element;

  const init = () => {
    element = createElement();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.classList.add("flex-row-space-between");

    const header = document.createElement("h2");
    header.textContent = headerText;

    container.append(header);
    if (sortDropdown) {
      container.append(sortDropdown);
    }

    return container;
  };

  init();

  return {
    getElement: () => element,
  };
};

export default ViewHeader;
