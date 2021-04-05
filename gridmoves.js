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
  let grid = document.getElementById('grid');
  let edge = document.getElementById('size').value;
  let square = document.getElementById('square').value;
  let move = document.getElementById('move').value;
  let type = document.getElementById('type').value;
  let domString = "";
  document.documentElement.style.setProperty('--rows', edge * 2 + 1);
  document.documentElement.style.setProperty('--square', square + "px");
  for (var i = edge; i >= -edge; i--) {
    for (var j = -edge; j <= edge; j++) {
      let distance = eval(type + "(j, i)");
      if (distance <= move) {
        domString = domString + '<div class="square active"></div>';
      } else {
        domString = domString + '<div class="square"></div>';
      }
    }
  }
  grid.innerHTML = domString;
};
