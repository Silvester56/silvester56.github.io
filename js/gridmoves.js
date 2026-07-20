window.onload = () => {
  const world = document.querySelector('#grid');
  const canvasContext = world.getContext('2d');
  const squaresInput = new CustomNumberInput("squares", 5, 5);
  const sizeInput = new CustomNumberInput("size", 40, 5, null, 5);
  const radiusInput = new CustomNumberInput("radius", 3, 3);

  const distances = {
    manhattan: (x0, y0, x1, y1) => Math.abs(x0 - x1) + Math.abs(y0 - y1),
    eucledian: (x0, y0, x1, y1) => Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1)),
    chebyshev: (x0, y0, x1, y1) => Math.max(Math.abs(x0 - x1), Math.abs(y0 - y1))
  };

  const draw = () => {
    let numberOfSquares = squaresInput.getValue() * 2 + 1;
    let sizeOfSquare = sizeInput.getValue();
    let radius = radiusInput.getValue();
    let type = document.querySelector("#type").value;
    world.width = numberOfSquares * sizeOfSquare;
    world.height = numberOfSquares * sizeOfSquare;
    for (let i = 0; i < numberOfSquares; i++) {
      for (let j = 0; j < numberOfSquares; j++) {
        if (distances[type](Math.floor(numberOfSquares / 2), Math.floor(numberOfSquares / 2), i, j) <= radius) {
          canvasContext.fillStyle = "red";
          canvasContext.fillRect(i * sizeOfSquare, j * sizeOfSquare, sizeOfSquare, sizeOfSquare);
        }
      }
    }
  };

  document.querySelector('#draw').onclick = draw;
}