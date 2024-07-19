window.onload = () => {
  const world = document.querySelector('#game');
  const canvasContext = world.getContext('2d');

  world.width = world.clientWidth;
  world.height = world.clientHeight;

  let frames = 0;
  let score = 0;
  let imagesLoaded = 0;
  let level = 0;
  let imageNameArray = ["player.png", "player2.png", "enemy.png", "enemy2.png", "life.png", "snow.png"];

  const keys = {
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    Space: { pressed: false }
  }

  class Map {
    constructor() {
      this.lineSize = 4;
      this.pelletSize = 8;
      this.lines = [];
      this.pellets = [];
      this.pelletSpacing = 20;
      this.pelletVerticalNumber = 30;
      this.pelletsOnSmallLines = 4;
      let smallLinesNumbers;
      let verticalLines = 6;
      let columnWidth = this.pelletSpacing * (this.pelletsOnSmallLines + 1);
      this.rectangles = [];
      this.height = this.pelletSpacing * this.pelletVerticalNumber;
      this.width = columnWidth * (verticalLines - 1);
      this.offsetX = (world.width - this.width) / 2;
      this.offsetY = 50;

      for (let i = 0; i < verticalLines; i++) {
        this.lines.push({startX: i * columnWidth, startY: 0, endX: i * columnWidth, endY: this.height});
        smallLinesNumbers = i % 2 === 0 ? [0, 5, 10, 14, 18, 27, this.pelletVerticalNumber] : [0, 3, 7, 12, 25, this.pelletVerticalNumber];
        for (let j = 0; j <= this.pelletVerticalNumber; j++) {
          this.pellets.push({posX: i * columnWidth, posY: this.pelletSpacing * j});
          if (i != verticalLines - 1 && smallLinesNumbers.includes(j)) {
            this.lines.push({startX: i * columnWidth, startY: this.pelletSpacing * j, endX: (i + 1) * columnWidth, endY: this.pelletSpacing * j});
            if (j < this.pelletVerticalNumber) {
              let nextJChangeName = smallLinesNumbers.find(element => element > j);
              this.rectangles.push({cleared: false, startX: i * columnWidth, startY: this.pelletSpacing * j, endX: (i + 1) * columnWidth, endY: this.pelletSpacing * nextJChangeName});
            }
            for (let k = 1; k <= this.pelletsOnSmallLines && !(j === this.pelletVerticalNumber && i === (verticalLines / 2) - 1); k++) {
              this.pellets.push({posX: i * columnWidth + k * this.pelletSpacing, posY: this.pelletSpacing * j});
            }
          }
        }
      }
    }

    getBottomMiddleCoordinates() {
      let middle = Math.floor(this.width / 8) * 4; // TODO generic variable with velocity
      return {
        x: this.offsetX + middle,
        y: this.offsetY + this.height
      }
    }

    collide(posX, posY) {
      let x = posX - this.offsetX;
      let y = posY - this.offsetY;
      return this.lines.some(line => {
        if (line.startX === line.endX) {
          return x === line.startX && y >= line.startY && y <= line.endY;
        } else {
          return y === line.startY && x >= line.startX && x <= line.endX;
        }
      });
    }

    isEmpty(rect) {
      return !this.pellets.some(pellet => {
        return pellet.posX >= rect.startX && pellet.posX <= rect.endX && pellet.posY >= rect.startY && pellet.posY <= rect.endY
      });
    }

    checkRectangles() {
      this.rectangles.filter(rect => !rect.cleared).forEach(rect => {
        if (this.isEmpty(rect)) {
          rect.cleared = true;
        }
      });
      if (this.rectangles.every(rect => rect.cleared)) {
        // TODO end level
      }
    }

    update(player) {
      for (let i = 0; i < this.pellets.length; i++) {
        if (player.positionX === this.offsetX + this.pellets[i].posX && player.positionY === this.offsetY + this.pellets[i].posY) {
          this.pellets.splice(i, 1);
          score = score + 20;
          this.checkRectangles();
          return;
        }
      }
    }

    draw() {
      canvasContext.fillStyle = "blue";
      this.rectangles.filter(rect => rect.cleared).forEach(rect => {
        let startingPointX = this.offsetX + rect.startX;
        let startingPointY = this.offsetY + rect.startY;
        let endingPointX = this.offsetX + rect.endX;
        let endingPointY = this.offsetY + rect.endY;
        canvasContext.fillRect(startingPointX, startingPointY, endingPointX - startingPointX, endingPointY - startingPointY);
      });
      canvasContext.fillStyle = "red";
      this.lines.forEach(line => {
        canvasContext.fillRect(this.offsetX + line.startX - this.lineSize / 2, this.offsetY + line.startY - this.lineSize / 2, line.endX - line.startX + this.lineSize, line.endY - line.startY + this.lineSize);
      });
      canvasContext.fillStyle = "yellow";
      this.pellets.forEach(pellet => {
        canvasContext.fillRect(this.offsetX + pellet.posX - this.pelletSize / 2, this.offsetY + pellet.posY - this.pelletSize / 2, this.pelletSize, this.pelletSize);
      });
      canvasContext.fillStyle = "white";
      canvasContext.font = `20px Verdana`;
      canvasContext.fillText("score " + score, 50, 50);
    }
  }

  const map = new Map();

  class Player {
    constructor(x, y) {
      this.freezing = false;
      this.freezingTime = 50;
      this.freezingAmmo = 3;
      this.spriteNumber = 0;
      this.lives = 2;
      this.positionX = x;
      this.positionY = y;
      this.previousPositionX = x;
      this.previousPositionY = y;
      this.velocityX = 0;
      this.velocityY = 0;
      this.spriteNumber = 1;
      this.width = 32;
      this.height = 32;
    }

    draw() {
      if (this.spriteNumber === 1) {
        canvasContext.drawImage(imageArray[0], this.positionX - this.width / 2, this.positionY - this.height / 2);
      } else if (this.spriteNumber === 2) {
        canvasContext.drawImage(imageArray[1], this.positionX - this.width / 2, this.positionY - this.height / 2);
      }
      for (var i = 0; i < this.lives; i++) {
        canvasContext.drawImage(imageArray[4], 50 + i * 20, 80);
      }
      for (var i = 0; i < this.freezingAmmo; i++) {
        canvasContext.drawImage(imageArray[5], 50 + i * 20, 100);
      }
    }

    move(newPosX, newPosY) {
      this.previousPositionX = this.positionX;
      this.previousPositionY = this.positionY;
      this.positionX = newPosX;
      this.positionY = newPosY;
    }

    update() {
      if (this.freezing) {
        this.freezingTime--;
        if (this.freezingTime === 0) {
          this.freezingTime = 50;
          this.freezing = false;
        }
      }
      if (keys.ArrowLeft.pressed) {
        this.velocityX = -2;
        this.spriteNumber = 2;
      } else if (keys.ArrowRight.pressed) {
        this.velocityX = 2;
        this.spriteNumber = 1;
      } else {
        this.velocityX = 0;
      }
      if (keys.ArrowUp.pressed) {
        this.velocityY = -2;
      } else if (keys.ArrowDown.pressed) {
        this.velocityY = 2;
      } else {
        this.velocityY = 0;
      }
      if (this.velocityX === 0 && this.velocityY === 0) {
        return;
      }
      let newPositionX = this.positionX + this.velocityX;
      let newPositionY = this.positionY + this.velocityY;

      let xAxisMoveisPossible = map.collide(newPositionX, this.positionY);
      let yAxisMoveisPossible = map.collide(this.positionX, newPositionY);

      if (this.velocityX === 0) {
        if (yAxisMoveisPossible) {
          this.move(this.positionX, newPositionY);
        }
      } else if (this.velocityY === 0) {
        if (xAxisMoveisPossible) {
          this.move(newPositionX, this.positionY);
        }
      } else {
        if (yAxisMoveisPossible && !xAxisMoveisPossible) {
          this.move(this.positionX, newPositionY);
        }
        if (xAxisMoveisPossible && !yAxisMoveisPossible) {
          this.move(newPositionX, this.positionY);
        }
        if (xAxisMoveisPossible && yAxisMoveisPossible) { // Intersection
          if (this.previousPositionX === this.positionX) {
            this.move(newPositionX, this.positionY);
          } else {
            this.move(this.positionX, newPositionY)
          }
        }
      }
    }

    freeze() {
      this.freezing = true;
    }
  }

  const player = new Player(map.getBottomMiddleCoordinates().x, map.getBottomMiddleCoordinates().y);

  const animationLoop = () => {
    requestAnimationFrame(animationLoop);
    canvasContext.clearRect(0, 0, world.width, world.height);
    map.update(player);
    map.draw();
    player.update();
    player.draw();
    frames++;
  }

  addEventListener('keydown', ({key}) => {
    switch(key) {
      case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      break;
      case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      break;
      case 'ArrowUp':
      keys.ArrowUp.pressed = true;
      break;
      case 'ArrowDown':
      keys.ArrowDown.pressed = true;
      break;
    }
  });

  addEventListener('keyup', ({key}) => {
    switch(key) {
      case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
      case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
      case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break;
      case 'ArrowDown':
      keys.ArrowDown.pressed = false;
      break;
      case ' ':
      player.freeze();
    }
  });

  let imageArray = imageNameArray.map(name => {
    let img = new Image();
    img.src = "../img/" + name;
    img.onload = () => {
      imagesLoaded++;
      if(imagesLoaded === imageNameArray.length) {
        animationLoop();
      }
    }
    return img;
  });
}
