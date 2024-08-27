window.onload = () => {
  const world = document.querySelector('#game');
  const canvasContext = world.getContext('2d');

  const enumValue = (name) => Object.freeze({toString: () => name});
  const GamePhases = Object.freeze({
    MENU: enumValue("MENU"),
    PLAY: enumValue("PLAY"),
    LOSE_LIFE: enumValue("LOSE_LIFE"),
    NEXT_LEVEL: enumValue("NEXT_LEVEL"),
    GAME_OVER: enumValue("GAME_OVER")
  });
  const EnemyBehavior = Object.freeze({
    WALK: enumValue("WALK"),
    STILL: enumValue("STILL"),
    PATROL: enumValue("PATROL"),
    SEEK: enumValue("SEEK"),
    REPOP: enumValue("REPOP")
  });

  world.width = world.clientWidth;
  world.height = world.clientHeight;

  let gamePhase = GamePhases.MENU;
  let score = 0;
  let imagesLoaded = 0;
  let level = 0;
  let map;
  let milliseconds;
  let imageNameArray = ["life.png", "snow.png", "text.png", "enemy.png"];
  let enemiesArray = [];
  let resetTime = 0;
  let freezingTime = 0;
  let nextScoreGoal = 30000;
  let eatEnemiesTime = 0;
  let pointsFromEnemies = 200;

  const addToScore = (points, player) => {
    score = score + points;
    if (score >= nextScoreGoal) {
      player.lives++;
      nextScoreGoal = nextScoreGoal + 50000;
    }
  }

  const drawTextFromSprite = (colorNumber, text, x, y, size) => {
    text.split("").forEach((character, i) => {
      let offsetX = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(character.toUpperCase()) * 8;
      let offsetY = colorNumber * 24;
      if (offsetX >= 0) {
        canvasContext.imageSmoothingEnabled = false;
        canvasContext.drawImage(imageArray[2], offsetX, offsetY, 8, 8, x + i * size, y, size, size);
      }
    });
  }

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
      let verticalLines = 6;
      let smallLinesNumbersBasis = Array.from(Array(verticalLines - 1), (_, number) => [[5, 10, 14, 18, 27], [3, 7, 12, 23]][number % 2]);
      let smallLinesNumbers;
      let nextSmallLineNumber;
      let columnWidth = this.pelletSpacing * (this.pelletsOnSmallLines + 1);
      this.rectangles = [];
      this.rectanglesCleared = 0;
      this.cornerCleared = 0;
      this.height = this.pelletSpacing * this.pelletVerticalNumber;
      this.width = columnWidth * (verticalLines - 1);
      this.offsetX = (world.width - this.width) / 2;
      this.offsetY = 25;

      const candidateCantBeAdded = (candidate, index) => {
        let left = index - 1 >= 0 && smallLinesNumbersBasis[index - 1].includes(candidate);
        let center = smallLinesNumbersBasis[index].includes(candidate) || smallLinesNumbersBasis[index].includes(candidate - 1) || smallLinesNumbersBasis[index].includes(candidate + 1);
        let right = index + 1 < smallLinesNumbersBasis.length && smallLinesNumbersBasis[index + 1].includes(candidate);
        let borders = candidate - 1 === 0 || candidate + 1 === this.pelletVerticalNumber;
        return left || center || right || borders;
      };

      const findFirstCandidate = (array) => {
        const sortedCopy = [...array].sort((a, b) => a - b);
        let tmpArray = [];
        for (let index = 0; index < sortedCopy.length - 1; index++) {
          tmpArray.push({
            start: sortedCopy[index],
            end: sortedCopy[index + 1],
            distance: sortedCopy[index + 1] - sortedCopy[index],
          })
        }
        let firstElement = tmpArray.sort((a, b) => b.distance - a.distance)[0];
        return Math.floor(firstElement.start + firstElement.distance / 2);
      };

      for (let indexOfOperation = 0; indexOfOperation < level; indexOfOperation++) {
        let currentIndex = indexOfOperation % smallLinesNumbersBasis.length;
        let candidate = findFirstCandidate(smallLinesNumbersBasis[currentIndex]);
        let attempts = 0;
        let candidateOffset = 0;
        while (candidateCantBeAdded(candidate, currentIndex)) {
          if (attempts % 2 === 0) {
            candidateOffset++;
          }
          candidate = candidate + candidateOffset * [1, -1][attempts % 2];
          attempts++;
        }
        if (candidate > 0 && candidate < this.pelletVerticalNumber) {
          smallLinesNumbersBasis[currentIndex].push(candidate);
        }
      }
      
      for (let i = 0; i < verticalLines; i++) {
        this.lines.push({startX: i * columnWidth, startY: 0, endX: i * columnWidth, endY: this.height});
        smallLinesNumbers = i !== verticalLines - 1 ? smallLinesNumbersBasis[i].concat([0, this.pelletVerticalNumber]) : [];
        smallLinesNumbers.sort((a, b) => a - b);
        for (let j = 0; j <= this.pelletVerticalNumber; j++) {
          this.pellets.push({posX: i * columnWidth, posY: this.pelletSpacing * j});
          if (i !== verticalLines - 1 && smallLinesNumbers.includes(j)) {
            this.lines.push({startX: i * columnWidth, startY: this.pelletSpacing * j, endX: (i + 1) * columnWidth, endY: this.pelletSpacing * j});
            if (j < this.pelletVerticalNumber) {
              nextSmallLineNumber = smallLinesNumbers.find(element => element > j);
              this.rectangles.push({isACorner: (i === 0 || i === verticalLines - 2) && (j === 0 || j === smallLinesNumbers[smallLinesNumbers.length - 2]), cleared: false, startX: i * columnWidth, startY: this.pelletSpacing * j, endX: (i + 1) * columnWidth, endY: this.pelletSpacing * nextSmallLineNumber});
            }
            for (let k = 1; k <= this.pelletsOnSmallLines && !(j === this.pelletVerticalNumber && i === (verticalLines / 2) - 1); k++) {
              this.pellets.push({posX: i * columnWidth + k * this.pelletSpacing, posY: this.pelletSpacing * j});
            }
          }
        }
      }
    }

    getBottomMiddleCoordinates() {
      let middle = Math.floor(this.width / 8) * 4;
      return {
        x: this.offsetX + middle,
        y: this.offsetY + this.height
      }
    }

    getCornersCoordinates() {
      return {
        upLeftX: this.offsetX,
        upLeftY: this.offsetY,
        upRightX: this.offsetX + this.width,
        upRightY: this.offsetY,
        downLeftX: this.offsetX,
        downLeftY: this.offsetY + this.height,
        downRightX: this.offsetX + this.width,
        downRightY: this.offsetY + this.height
      }
    }

    getColumnWidth() {
      return this.pelletSpacing * (this.pelletsOnSmallLines + 1);
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
          this.rectanglesCleared++;
          if (this.rectanglesCleared === this.rectangles.length) {
            gamePhase = GamePhases.NEXT_LEVEL;
            resetTime = world.width * 2;
          } else if (rect.isACorner) {
            this.cornerCleared++;
            if (this.cornerCleared === 4) {
              eatEnemiesTime = 600;
            }
          }
        }
      });
    }

    update(player) {
      for (let i = 0; i < this.pellets.length; i++) {
        if (player.positionX === this.offsetX + this.pellets[i].posX && player.positionY === this.offsetY + this.pellets[i].posY) {
          this.pellets.splice(i, 1);
          addToScore(20, player);
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
      drawTextFromSprite(7, "score " + score, 50, 16, 16);
    }
  }

  class Person {
    constructor(x, y) {
      this.positionX = x;
      this.positionY = y;
      this.previousPositionX = x;
      this.previousPositionY = y;
      this.velocityX = 0;
      this.velocityY = 0;
    }

    move(newPosX, newPosY) {
      this.previousPositionX = this.positionX;
      this.previousPositionY = this.positionY;
      this.positionX = newPosX;
      this.positionY = newPosY;
    }

    update() {
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
        if (xAxisMoveisPossible && yAxisMoveisPossible) {
          if (this.previousPositionX === this.positionX) {
            this.move(newPositionX, this.positionY);
          } else {
            this.move(this.positionX, newPositionY)
          }
        }
      }
    }
  }

  class Player extends Person {
    constructor(x, y) {
      super(x, y);
      this.freezingAmmo = 3;
      this.spriteOffsetX = 0;
      this.spriteOffsetY = 0;
      this.lives = 2;
      this.spriteCroppedWidth = 20;
      this.spriteCroppedHeight = 23;
      this.drawWidth = 32;
      this.drawHeight = 32;
      let img = new Image();
      img.src = "../img/penguin.png";
      img.onload = () => {
        this.sprite = img;
      }
    }

    draw() {
      if (this.sprite) {
        canvasContext.drawImage(this.sprite, this.spriteOffsetX, this.spriteOffsetY, this.spriteCroppedWidth, this.spriteCroppedHeight, this.positionX - this.drawWidth / 2, this.positionY - this.drawHeight / 2, this.drawWidth, this.drawHeight);
      }
      for (var i = 0; i < this.lives; i++) {
        canvasContext.drawImage(imageArray[0], 50 + i * 20, 80);
      }
      for (var i = 0; i < this.freezingAmmo; i++) {
        canvasContext.drawImage(imageArray[1], 50 + i * 20, 100);
      }
    }

    update(milliseconds) {
      if (freezingTime > 0) {
        freezingTime--;
      }
      if (gamePhase === GamePhases.LOSE_LIFE) {
        this.spriteOffsetX = 4 * this.spriteCroppedWidth;
        return;
      }
      let step = Math.floor(milliseconds / 250) % 4;
      if (keys.ArrowLeft.pressed) {
        this.velocityX = -2;
        this.spriteOffsetY = this.spriteCroppedHeight;
      } else if (keys.ArrowRight.pressed) {
        this.velocityX = 2;
        this.spriteOffsetY = 0;
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
      if (this.velocityX !== 0 || this.velocityY !== 0) {
        this.spriteOffsetX = (step * this.spriteCroppedWidth) % (4 * this.spriteCroppedWidth);
      } else {
        this.spriteOffsetX = 0;
      }
      super.update();
    }

    freeze() {
      if (this.freezingAmmo > 0) {
        freezingTime = 100;
        this.freezingAmmo--;
      }
    }
  }

  class Enemy extends Person {
    constructor(cornersCoordinates, startingOffsetX, startingOffsetY, startingVelocityX, startingVelocityY, isPatroler) {
      super(isPatroler ? cornersCoordinates.downRightX : cornersCoordinates.upLeftX + startingOffsetX, isPatroler ? cornersCoordinates.downRightY : cornersCoordinates.upLeftY + startingOffsetY);
      this.cornersCoordinates = cornersCoordinates;
      this.width = 32;
      this.height = 32;
      this.velocityX = startingVelocityX;
      this.velocityY = startingVelocityY;
      this.repopPositionX = isPatroler ? cornersCoordinates.downRightX : cornersCoordinates.upLeftX + startingOffsetX;
      this.repopPositionY = isPatroler ? cornersCoordinates.downRightY : cornersCoordinates.upLeftY + startingOffsetY;
      this.isPatroler = isPatroler;
      this.behavior = isPatroler ? EnemyBehavior.PATROL : EnemyBehavior.WALK;
      this.spriteOffsetY = isPatroler ? 32 : 0;
      this.timeUntilNextBehavior = Math.max(200, 4000 - level * 200);
    }

    draw (milliseconds) {
      let step = freezingTime > 0 ? 2 : Math.floor(milliseconds / 500) % 2;
      let offsetY = this.spriteOffsetY;
      if (eatEnemiesTime > 0) {
        offsetY = 64;
        if (eatEnemiesTime < 200) {
          offsetY = Math.floor(milliseconds / 500) % 2 === 0 ? 64 : this.spriteOffsetY;
        }
      }
      canvasContext.drawImage(imageArray[3], gamePhase === GamePhases.NEXT_LEVEL ? 0 : step * 32, offsetY, this.width, this.height, this.positionX - this.width / 2, this.positionY - this.height / 2, this.width, this.height);
    }

    update(player) {
      if (freezingTime > 0) {
        return;
      }
      if (gamePhase === GamePhases.PLAY) {
        if (this.positionX < player.positionX + 5 && this.positionX > player.positionX - 5 && this.positionY < player.positionY + 5 && this.positionY > player.positionY - 5) {
          if (eatEnemiesTime > 0) {
            this.behavior = EnemyBehavior.REPOP;
            addToScore(pointsFromEnemies, player);
            pointsFromEnemies = pointsFromEnemies * 2;
          } else {
            gamePhase = GamePhases.LOSE_LIFE;
            resetTime = world.width;
          }
        }
      }
      if (this.behavior === EnemyBehavior.REPOP) {
        this.positionX = this.repopPositionX;
        this.positionY = this.isPatroler ? this.repopPositionY + 20 : this.repopPositionY - 20;
        this.velocityX = 0;
        this.velocityY = 0;
        if (eatEnemiesTime === 0) {
          this.positionX = this.repopPositionX;
          this.positionY = this.repopPositionY;
          this.behavior = EnemyBehavior.WALK;
          this.velocityX = 2;
          this.velocityY = 2;
          if (this.isPatroler) {
            this.behavior = EnemyBehavior.PATROL;
            this.velocityX = 0;
            this.velocityY = -2;
          }
        }
      } else if (this.behavior === EnemyBehavior.WALK) {
        if (this.positionY === this.cornersCoordinates.upLeftY) {
          this.velocityY = 2;
        } else if (this.positionY === this.cornersCoordinates.downRightY) {
          this.velocityY = -2;
        }
        if (this.previousPositionX === this.positionX) {
          if (map.collide(this.positionX - this.velocityX, this.positionY)) {
            this.velocityX = -this.velocityX;
          }
        }
      } else if (this.behavior === EnemyBehavior.PATROL) {
        if (this.positionY === this.cornersCoordinates.upLeftY) {
          this.velocityX = -2;
        } else if (this.positionY === this.cornersCoordinates.downRightY) {
          this.velocityX = 2;
        }
        if (this.positionX === this.cornersCoordinates.upLeftX) {
          this.velocityY = 2;
        } else if (this.positionX === this.cornersCoordinates.downRightX) {
          this.velocityY = -2;
        }
        this.timeUntilNextBehavior--;
        if (this.timeUntilNextBehavior === 0) {
          this.behavior = EnemyBehavior.STILL;
          this.timeUntilNextBehavior = 200;
        }
      } else if (this.behavior === EnemyBehavior.STILL) {
        this.velocityX = 0;
        this.velocityY = 0;
        this.timeUntilNextBehavior--;
        if (this.timeUntilNextBehavior === 0) {
          this.behavior = EnemyBehavior.SEEK;
          this.timeUntilNextBehavior = 400;
        }
      } else if (this.behavior === EnemyBehavior.SEEK) {
        if (player.positionX < this.positionX) {
          this.velocityX = -2;
        } else if (player.positionX > this.positionX) {
          this.velocityX = 2;
        } else {
          this.velocityX = 0;
        }
        if (player.positionY < this.positionY) {
          this.velocityY = -2;
        } else if (player.positionY > this.positionY) {
          this.velocityY = 2;
        } else {
          this.velocityY = 0;
        }
        this.timeUntilNextBehavior--;
        if (this.timeUntilNextBehavior === 0) {
          this.behavior = EnemyBehavior.STILL;
          this.timeUntilNextBehavior = 200;
        }
      }
      super.update();
    }
  }

  const player = new Player(0, 0);

  const resetEnemiesAndPlayer = (nextLevel) => {
    if (nextLevel) {
      map = new Map();
      player.freezingAmmo = 3;
    }
    enemiesArray = Array.from(Array(Math.min(level + 4, 6)), (_, number) => new Enemy(map.getCornersCoordinates(), number * map.getColumnWidth(), 2, 2, 2, false));
    enemiesArray.push(new Enemy(map.getCornersCoordinates(), 0, 0, 0, -2, true));
    player.positionX = map.getBottomMiddleCoordinates().x;
    player.positionY = map.getBottomMiddleCoordinates().y;
  }

  resetEnemiesAndPlayer(true);


  const drawTextCenter = (colorNumber, text, offsetY, size) => {
    drawTextFromSprite(colorNumber, text, (world.width - text.length * size) / 2, (world.height - size) / 2 + offsetY, size)
  }

  const animationLoop = () => {
    milliseconds = new Date().getMilliseconds();
    requestAnimationFrame(animationLoop);
    canvasContext.clearRect(0, 0, world.width, world.height);
    if (gamePhase === GamePhases.MENU) {
      drawTextCenter(2, "-  radima  -", -100, 32);
      drawTextCenter(3, "push space button", 0, 32);
      drawTextCenter(0, "one player only", 50, 32);
    } else if (gamePhase === GamePhases.GAME_OVER) {
      drawTextCenter(0, "GAME OVER", 0, 40);
      drawTextCenter(7, "score " + score, 100, 20);
    } else if (gamePhase === GamePhases.NEXT_LEVEL) {
      map.draw();
      enemiesArray.forEach(enemy => {
        enemy.draw(milliseconds);
      });
      player.draw();
      canvasContext.fillStyle = "black";
      canvasContext.fillRect(resetTime, 0, world.width, world.height);
      resetTime = resetTime - 16;
      if (resetTime <= 0) {
        level++;
        gamePhase = GamePhases.PLAY;
        resetEnemiesAndPlayer(true);
      }
    } else {
      map.update(player);
      map.draw();
      enemiesArray.forEach(enemy => {
        enemy.update(player);
        enemy.draw(milliseconds);
      });
      player.update(milliseconds);
      player.draw();
      if (eatEnemiesTime > 0) {
        eatEnemiesTime--;
        if (eatEnemiesTime === 0) {
          pointsFromEnemies = 200;
        }
      }
      if (gamePhase === GamePhases.LOSE_LIFE) {
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(resetTime, 0, world.width, world.height);
        resetTime = resetTime - 16;
        if (resetTime <= 0) {
          if (player.lives === 0) {
            gamePhase = GamePhases.GAME_OVER;
          } else {
            player.lives--;
            gamePhase = GamePhases.PLAY;
            resetEnemiesAndPlayer(false);
          }
        }
      }
    }
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
      gamePhase === GamePhases.MENU ? gamePhase = GamePhases.PLAY : player.freeze();
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
