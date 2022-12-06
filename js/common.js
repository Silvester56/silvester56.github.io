class domNode {
  constructor(selector) {
    if (selector.startsWith("#")) {
      this.elementsList = [document.getElementById(selector.slice(1))];
    } else if (selector.startsWith(".")) {
      this.elementsList = document.getElementsByClassName(selector.slice(1));
    } else {
      this.elementsList = document.getElementsByTagName(selector.slice(1));
    }
  }
  isChecked() {
    return this.elementsList[0].checked;
  }
  getValue() {
    return this.elementsList[0].value;
  }
  setValue(newValue) {
    this.elementsList[0].value = newValue;
  }
}
