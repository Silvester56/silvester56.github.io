const selectors = ["flex-direction", "flex-wrap"];

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
