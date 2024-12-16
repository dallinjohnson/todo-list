import ProjectView from "./ProjectView";
import TaskView from "./TaskView";

const App = (rootElement) => {
  const setContent = (c) => {
    rootElement.innerHTML = "";

    const content = c;
    content.id = "content";
    rootElement.appendChild(content);
  };

  const init = () => {
    const container = document.createElement("div");
    container.classList.add("split-view");
    const header = document.createElement("h1");
    header.textContent = "Todo List";
    header.id = "header";
    container.appendChild(header);
    container.appendChild(ProjectView().getElement());
    container.appendChild(TaskView().getElement());

    setContent(container);
  };

  init();

  return {
    setContent,
  };
};

export default App;
