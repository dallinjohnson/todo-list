const Editable = (dataValue, placeholderText, handleUpdate) => {
  let element;
  let textContent;
  let previousContent;

  const init = () => {
    element = createElement();
    previousContent = element.textContent;
  };

  const createElement = () => {
    const el = document.createElement("span");
    el.dataValue = dataValue;

    if (textContent) {
      el.textContent = textContent;
    } else {
      el.textContent = placeholderText;
    }

    el.addEventListener("focus", handleClick);
    el.addEventListener("blur", (e) => {
      element.classList.remove("editable-empty");

      if (element.textContent === "") {
        element.textContent = placeholderText;
      }

      if (element.textContent !== previousContent) {
        handleUpdate(e);
      }
      previousContent = element.textContent;
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

  const setText = (newTextContent) => {
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
    setText,
  };
};

export { Editable };
