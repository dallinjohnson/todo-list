import pubsub from "../pubsub/PubSub";

const SortDropdown = (sortOptions, selectId, onChangeEvent) => {
  let element;
  let select;

  const init = () => {
    element = createElement();
  };

  const createElement = () => {
    const div = document.createElement("div");
    select = createSelect();
    const label = createLabel();

    div.appendChild(label);
    div.appendChild(select);
    div.classList.add("flex-group-5px-gap");
    return div;
  };

  const createSelect = () => {
    const select = document.createElement("select");
    select.classList.add("sort-select");
    select.id = selectId;

    sortOptions.map((o) => {
      const option = document.createElement("option");
      option.textContent = o.textContent;
      option.value = o.value;
      if (o.selected) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    select.addEventListener("change", () =>
      pubsub.publish(onChangeEvent, select.value)
    );

    return select;
  };

  const createLabel = () => {
    const label = document.createElement("label");
    label.htmlFor = selectId;
    label.textContent = "Sort By";
    return label;
  };

  init();

  return {
    getElement: () => element,
    getValue: () => select.value,
  };
};

export default SortDropdown;
