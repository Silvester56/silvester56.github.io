const selectors = ["flex-direction", "flex-wrap", "justify-content"];
let nbItems = 3;

window.onload = () => {
  for (var selector of selectors) {
    document.getElementById(selector).addEventListener('change', (event) => {
      changeRules();
    });
  }
}

let changeRules = () => {
  let str = "";
  for (var selector of selectors) {
    str = str + selector + ":" + document.getElementById(selector).value + ";";
  }
  document.getElementById("container").setAttribute("style", str);
}

let checkDisabled = () => {
  document.getElementById('remove').disabled = (nbItems === 0);
}

let draw = () => {
  let str = ""
  for (var i = 0; i < nbItems; i++) {
    str = `${str}<div class="item">${i + 1}</div>`;
  }
  document.getElementById("container").innerHTML = str;
}

let add = () => {
  nbItems++;
  draw();
  checkDisabled();
}

let remove = () => {
  nbItems--;
  draw();
  checkDisabled();
}
