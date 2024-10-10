const Checkbox = (handleClick) => {
  let element;

  const init = () => {
    element = createElement();
  };

  const createElement = () => {
    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";
    checkbox.addEventListener("click", handleClick);
    return checkbox;
  };

  const setChecked = (isChecked) => {
    isChecked
      ? element.classList.add("checked")
      : element.classList.remove("checked");
  };

  init();

  return {
    getElement: () => element,
    setChecked,
  };
};

export default Checkbox;
