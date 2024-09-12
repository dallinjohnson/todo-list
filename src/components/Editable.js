class Editable {
  constructor(
    elementType,
    dataValue,
    textContent,
    placeholderText,
    handleUpdate
  ) {
    this.elementType = elementType;
    this.dataValue = dataValue;
    this.textContent = textContent;
    this.placeholderText = placeholderText;
    this.handleUpdate = handleUpdate;
    this.element = this.createElement();
  }

  createElement() {
    const el = document.createElement(this.elementType);
    el.dataValue = this.dataValue;
    if (this.textContent) {
      el.textContent = this.textContent;
    } else {
      el.textContent = this.placeholderText;
    }
    el.addEventListener("focus", this.handleClick.bind(this));
    el.addEventListener("blur", this.handleUpdate);
    el.contentEditable = true;
    el.className = "editable";
    return el;
  }

  handleClick(e) {
    if (this.element.textContent == this.placeholderText) {
      this.element.textContent = "";
    }
  }
}

export { Editable };
