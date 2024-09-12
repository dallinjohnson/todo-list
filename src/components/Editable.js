const Editable = (
  elementType,
  dataValue,
  textContent,
  placeholderText,
  handleUpdate
) => {
  let element;

  const init = () => {
    element = createElement();
  };

  const createElement = () => {
    const el = document.createElement(elementType);
    el.dataValue = dataValue;
    if (textContent) {
      el.textContent = textContent;
    } else {
      el.textContent = placeholderText;
    }
    el.addEventListener("focus", handleClick);
    el.addEventListener("blur", handleUpdate);
    el.contentEditable = true;
    el.className = "editable";
    return el;
  };

  const handleClick = (e) => {
    if (element.textContent == placeholderText) {
      element.textContent = "";
    }
  };

  const update = (newTextContent) => {
    if (!newTextContent) {
      element.textContent = placeholderText;
      return;
    }
    element.textContent = newTextContent;
  };

  init();

  return {
    getElement: () => element,
    update,
  };
};

export { Editable };
