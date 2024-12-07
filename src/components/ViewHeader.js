import SortingCriteria from "../enums/SortingCriteria";
import pubsub from "../pubsub/PubSub";

class ViewHeader {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    // make container div
    const container = document.createElement("div");
    container.className = "task-list-controls";

    // make "sort by" dropdown
    const sortSelect = document.createElement("select");
    sortSelect.id = "task-sort-select";
    const sortOptions = [
      {
        value: SortingCriteria.DATE,
        textContent: "Date",
        selected: true,
      },
      {
        value: SortingCriteria.TITLE,
        textContent: "Title",
        selected: false,
      },
    ];

    sortOptions.map((option) => {
      const el = document.createElement("option");
      el.textContent = option.textContent;
      el.value = option.value;
      if (option.selected) {
        el.selected = true;
      }
      sortSelect.appendChild(el);
    });
    sortSelect.addEventListener("change", () => {
      pubsub.publish("sortTasks", sortSelect.value);
    });

    const sortLabel = document.createElement("label");
    sortLabel.htmlFor = "task-sort-select";
    sortLabel.textContent = "Sort By";

    const leftContainer = document.createElement("div");

    leftContainer.append(sortLabel, sortSelect);
    container.append(leftContainer);

    pubsub.publish("sortTasks", sortSelect.value);

    return container;
  }
}

export default ViewHeader;
