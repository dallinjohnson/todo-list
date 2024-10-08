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
    el.addEventListener("blur", (e) => {
      element.classList.remove("editable-empty");
      handleUpdate(e);
    });
    el.addEventListener("keydown", handleKeyDown);
    el.contentEditable = true;
    el.setAttribute("spellcheck", false);
    el.className = "editable";
    return el;
  };

  const handleClick = (e) => {
    if (element.textContent == placeholderText) {
      element.classList.add("editable-empty");
      element.textContent = "";
    }
  };

  const update = (newTextContent) => {
    if (!newTextContent) {
      element.textContent = placeholderText;
      return;
    }
    element.textContent = newTextContent.trim();
  };

  const handleKeyDown = (e) => {
    e.target.classList.remove("editable-empty");

    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  init();

  return {
    getElement: () => element,
    update,
  };
};

export { Editable };
