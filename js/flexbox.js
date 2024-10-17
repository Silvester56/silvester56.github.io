const selectors = ["#flex-direction", "#flex-wrap", "#justify-content", "#align-items", "#align-content"];
let numberOfItems = 3;
let container;
let removeButton;
let addButton;

const changeRules = () => {
  let cssString = selectors.reduce((acc, cur) =>{
    let element = document.querySelector(cur);
    if (element.value !== "") {
      return `${acc + cur.slice(1)}:${element.value};`;
    }
    return acc;
  }, "");
  container.style = cssString;
};

const changeItems = (nb) => {
  numberOfItems = numberOfItems + nb;
  container.innerHTML = Array.from(Array(numberOfItems)).map((_, i) => `<div class="item">${i + 1}</div>`).join("");
  removeButton.disabled = numberOfItems === 0;
};

window.onload = () => {
  container = document.querySelector("#container");
  removeButton = document.querySelector("#removeItem");
  addButton = document.querySelector("#addItem");
  removeButton.onclick = () => changeItems(-1);
  addButton.onclick = () => changeItems(1);
  changeRules();
  selectors.forEach(s => document.querySelector(s).onchange = changeRules);
}