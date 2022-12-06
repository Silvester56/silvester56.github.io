let manhattan = (x, y) => {
  return Math.abs(x) + Math.abs(y);
};

let eucledian = (x, y) => {
  return Math.sqrt(x * x + y * y);
};

let minkowski = (x, y) => {
  return Math.cbrt(Math.abs(x * x * x) + Math.abs(y * y * y));
};

let displayGrid = () => {
  let html = new domNode("html");
  let grid = new domNode("#grid");
  let edge = new domNode("#size").val();
  let square = new domNode("#square").val();
  let move = new domNode("#move").val();
  let type = new domNode("#type").val();
  let domString = "";
  html.attr("style", `--rows: ${edge * 2 + 1}; --square: ${square}px`);
  for (var i = edge; i >= -edge; i--) {
    for (var j = -edge; j <= edge; j++) {
      let distance = eval(`${type}(j, i)`);
      if (distance <= move) {
        domString = `${domString}<div class="square active"></div>`;
      } else {
        domString = `${domString}<div class="square"></div>`;
      }
    }
  }
  grid.html(domString);
};
