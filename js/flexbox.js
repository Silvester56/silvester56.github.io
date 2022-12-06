const selectors = ["#flex-direction", "#flex-wrap", "#justify-content", "#align-items", "#align-content"];
let nbItems = 3;
let container;
let removeButton;

window.onload = () => {
  container = new domNode("#container");
  removeButton = new domNode("#remove");
  changeRules();
  for (var selector of selectors) {
    new domNode(selector).on("change", (event) => {
      changeRules();
    });
  }
}

let changeRules = () => {
  let str = "";
  for (var selector of selectors) {
    let element = new domNode(selector);
    if (element.val() !== "") {
      str = `${str + selector.slice(1)}:${element.val()};`;
    }
  }
  container.attr("style", str);
}

let changeItems = (nb) => {
  let str = "";
  nbItems = nbItems + nb;
  for (var i = 0; i < nbItems; i++) {
    str = `${str}<div class="item">${i + 1}</div>`;
  }
  container.html(str);
  removeButton.prop("disabled", (nbItems === 0));
}
