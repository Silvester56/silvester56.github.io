const createButtonElement = (text, callback) => {
  const retVal = document.createElement("button");
  retVal.innerHTML = text;
  retVal.onclick = callback;
  return retVal;
};

class CustomNumberInput {
  constructor(id, value, min, max, step) {
    this.value = value;
    this.minimum = typeof min === "number" ? min : -Infinity;
    this.maximum = typeof max === "number" ? max : Infinity;
    this.step = step || 1;
    this.valueHolder = document.createElement("span");
    this.decreaseButton = createButtonElement("-", () => {
      this.changeValue(-1);
    });
    this.increaseButton = createButtonElement("+", () => {
      this.changeValue(1);
    });
    this.updateInput();
    document.getElementById(id).classList.add("custom-number-input-button");
    document.getElementById(id).appendChild(this.decreaseButton);
    document.getElementById(id).appendChild(this.valueHolder);
    document.getElementById(id).appendChild(this.increaseButton);
  }
  
  updateInput() {
    this.decreaseButton.disabled = this.value === this.minimum;
    this.increaseButton.disabled = this.value === this.maximum;
    this.valueHolder.innerHTML = this.value;
  }

  changeValue(direction) {
    if (direction === 1) {
      this.value = Math.min(this.value + this.step, this.maximum);
    } else {
      this.value = Math.max(this.value - this.step, this.minimum);
    }
    this.updateInput();
  }

  getValue() {
    return this.value;
  }
}