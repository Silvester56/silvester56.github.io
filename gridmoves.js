const edge = 7;

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
  let move = document.getElementById('move').value;
  document.documentElement.style.setProperty('--rows', edge * 2 + 1);
  let gridArray = [];
  for (var i = edge; i >= -edge; i--) {
    for (var j = -edge; j <= edge; j++) {
      gridArray.push({x: j, y: i});
    }
  }
  grid.innerHTML = "";
  let type = document.getElementById('type').value;
  for (var i = 0; i < gridArray.length; i++) {
    let node = document.createElement("div");
    let distance = eval(type + "(gridArray[i].x, gridArray[i].y)");
    node.classList.add("square");
    if (distance <= move) {
      node.classList.add("active");
    }
    grid.appendChild(node);
  }
};
