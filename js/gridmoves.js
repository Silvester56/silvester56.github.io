window.onload = () => {
  const world = document.querySelector('#grid');
  const canvasContext = world.getContext('2d');

  const manhattan = (x0, y0, x1, y1) => {
    return Math.abs(x0 - x1) + Math.abs(y0 - y1);
  };

  const eucledian = (x0, y0, x1, y1) => {
    return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
  };

  const chebyshev = (x0, y0, x1, y1) => {
    return Math.max(Math.abs(x0 - x1), Math.abs(y0 - y1));
  };

  const draw = () => {
    let numberOfSquares = new domNode("#number").val() * 2 + 1;
    let sizeOfSquare = new domNode("#size").val();
    let radius = new domNode("#radius").val();
    let type = new domNode("#type").val();
    world.width = numberOfSquares * sizeOfSquare;
    world.height = numberOfSquares * sizeOfSquare;
    for (let i = 0; i < numberOfSquares; i++) {
      for (let j = 0; j < numberOfSquares; j++) {
        if (eval(`${type}(Math.floor(numberOfSquares / 2), Math.floor(numberOfSquares / 2), i, j)`) <= radius) {
          canvasContext.fillStyle = "red";
          canvasContext.fillRect(i * sizeOfSquare, j * sizeOfSquare, sizeOfSquare, sizeOfSquare);
        }
      }
    }
  };

  document.querySelector('#draw').onclick = draw;
}