const selectors = ["flex-direction", "flex-wrap", "justify-content", "align-items", "align-content"];
let nbItems = 3;

window.onload = () => {
  changeRules();
  for (var selector of selectors) {
    document.getElementById(selector).addEventListener("change", (event) => {
      changeRules();
    });
  }
}

let changeRules = () => {
  let str = "";
  for (var selector of selectors) {
    if (document.getElementById(selector).value !== "") {
      str = `${str + selector}:${document.getElementById(selector).value};`;
    }
  }
  document.getElementById("container").setAttribute("style", str);
}

let changeItems = (nb) => {
  let str = "";
  nbItems = nbItems + nb;
  for (var i = 0; i < nbItems; i++) {
    str = `${str}<div class="item">${i + 1}</div>`;
  }
  document.getElementById("container").innerHTML = str;
  document.getElementById("remove").disabled = (nbItems === 0);
}
