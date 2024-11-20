const App = () => {
  let element;
  let headerContainer;

  const init = () => {
    headerContainer = document.querySelector("#header");
    element = createElement();
  };

  const createElement = () => {};

  const render = () => {};

  init();

  return {
    getElement: () => element,
  };
};

export { App };
