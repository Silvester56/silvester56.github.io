const edge = 7;
let gridArray = [];
for (var i = edge; i >= -edge; i--) {
  for (var j = -edge; j <= edge; j++) {
    gridArray.push({x: j, y: i});
  }
}

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
  let grids = document.getElementsByClassName('grid');
  for (var j = 0; j < grids.length; j++) {
    for (var i = 0; i < gridArray.length; i++) {
      let node = document.createElement("div");
      let distance = eucledian(gridArray[i].x, gridArray[i].y);
      node.classList.add("square");
      if (distance <= j + 1) {
        node.classList.add("active");
      }
      grids[j].appendChild(node);
    }
  }
};

window.onload = displayGrid;
