import { ProjectList } from "./ProjectList";
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
    container.appendChild(ProjectList().getElement());
    container.appendChild(TaskView().getElement());

    setContent(container);
  };

  init();

  return {
    setContent,
  };
};

export default App;
