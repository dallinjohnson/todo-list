const IconGroup = (iconSrc, textElement) => {
  let element;

  const init = () => {
    element = createElement();
  };

  const createElement = () => {
    const container = document.createElement("span");
    container.classList.add("icon-group");
    const icon = createIcon();
    container.appendChild(icon);
    container.appendChild(textElement);
    return container;
  };

  const createIcon = () => {
    const img = document.createElement("img");
    img.src = iconSrc;
    img.classList.add("icon");
    return img;
  };

  init();

  return { getElement: () => element };
};

export default IconGroup;
