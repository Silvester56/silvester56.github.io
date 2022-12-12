class domNode {
  constructor(selector) {
    if (selector.startsWith("#")) {
      this.elementsList = [document.getElementById(selector.slice(1))];
    } else if (selector.startsWith(".")) {
      this.elementsList = document.getElementsByClassName(selector.slice(1));
    } else {
      this.elementsList = document.getElementsByTagName(selector);
    }
  }
  val(value) {
    if (value == null) {
      return this.elementsList[0].value;
    }
    this.elementsList[0].value = value;
  }
  html(value) {
    if (value == null) {
      return this.elementsList[0].innerHTML;
    }
    this.elementsList[0].innerHTML = value;
  }
  attr(attributeName, value) {
    if (value == null) {
      return this.elementsList[0].getAttribute(attributeName);
    }
    this.elementsList[0].setAttribute(attributeName, value);
  }
  on(events, handler) {
    this.elementsList[0].addEventListener(events, handler);
  }
  prop(propertyName, value) {
    if (value == null) {
      return this.elementsList[0][propertyName];
    }
    this.elementsList[0][propertyName] = value;
  }
}
