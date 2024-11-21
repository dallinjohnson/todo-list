import TaskView from "./TaskView";

const App = (rootElement) => {
  const setContent = (view) => {
    rootElement.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = view.heading;

    const content = view.content;
    content.id = "content";

    rootElement.appendChild(heading);
    rootElement.appendChild(content);
  };

  const init = () => {
    const initialContent = {
      heading: "Tasks",
      content: TaskView().getElement(),
    };
    setContent(initialContent);
  };

  init();

  return {
    setContent,
  };
};

export default App;
