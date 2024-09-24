window.onload = () => {
  const world = document.querySelector('#game');
  const canvasContext = world.getContext('2d');

  world.width = world.clientWidth;
  world.height = world.clientHeight;

  const polarCenterX = world.width / 2;
  const polarCenterY = world.height * 2;

  let robotSprite = new Image();

  const keys = {
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    Space: { pressed: false }
  }

  class RoundObject {
    constructor(r, a, s, c, f = true) {
      this.centerRadius = r;
      this.centerAngle = a;
      this.size = s;
      this.color = c;
      this.fill = f;
    }

    update() {
      if (keys.ArrowLeft.pressed) {
        this.centerAngle = this.centerAngle + 0.01;
      } else if (keys.ArrowRight.pressed) {
        this.centerAngle = this.centerAngle - 0.01;
      }
    }

    draw() {
      canvasContext.beginPath();
      canvasContext.arc(polarCenterX + this.centerRadius * Math.cos(this.centerAngle), polarCenterY + this.centerRadius * Math.sin(this.centerAngle), this.size, 0, 2 * Math.PI, false);
      if (this.fill) {
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
      } else {
        canvasContext.strokeStyle = this.color;
        canvasContext.stroke();
      }
    }
  }

  class Person {
    constructor(r, a) {
      this.positionRadius = r;
      this.positionAngle = a;
      this.velocityRadius = 0;
    }
  }

  class Player extends Person {
    constructor(r, a) {
      super(r, a);
      this.drawWidth = 27;
      this.drawHeight = 33;
      this.spriteOffsetX = 0;
      this.spriteOffsetY = 0;
      this.spriteCroppedWidth = 27;
      this.spriteCroppedHeight = 33;
    }

    draw() {
      if (robotSprite) {
        canvasContext.drawImage(robotSprite, this.spriteOffsetX, this.spriteOffsetY, this.spriteCroppedWidth, this.spriteCroppedHeight, polarCenterX + this.positionRadius * Math.cos(this.positionAngle) - this.drawWidth / 2, polarCenterY + this.positionRadius * Math.sin(this.positionAngle) - this.drawHeight, this.drawWidth, this.drawHeight);
      }
    }

    update() {
      if (keys.ArrowUp.pressed) {
        this.velocityRadius = 2;
      }
      if (keys.ArrowLeft.pressed) {
        this.spriteOffsetX = 27;
      } else if (keys.ArrowRight.pressed) {
        this.spriteOffsetX = 0;
      }
      this.positionRadius = this.positionRadius + this.velocityRadius;
      if (this.positionRadius > polarCenterY / 1.5) { // TODO polarCenterY / 1.5 must be a variable in constructor
        this.velocityRadius = this.velocityRadius - 0.1;
      } else {
        this.positionRadius = polarCenterY / 1.5;
        this.velocityRadius = 0;
      }
    }
  }
  
  const planet = new RoundObject(0, 0, polarCenterY / 1.5, "grey")
  const craters = Array.from(Array(100), (_, number) => new RoundObject(polarCenterY / 1.5 - number * 5 * Math.random(), Math.random() * 2 * Math.PI, 20 * Math.random(), "black", Math.random() > 0.5));
  const stars = Array.from(Array(100), (_, number) => new RoundObject(polarCenterY / 1.5 + number * 5 * Math.random(), Math.random() * 2 * Math.PI, 1, "white"));
  const player = new Player(polarCenterY / 1.5, Math.PI * 3 / 2);

  const animationLoop = () => {
    requestAnimationFrame(animationLoop);
    canvasContext.clearRect(0, 0, world.width, world.height);
    planet.draw();
    craters.forEach(c => {
      c.update();
      c.draw()
    });
    stars.forEach(s => {
      s.update();
      s.draw()
    });
    player.update();
    player.draw();
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
      case ' ':
      keys.Space.pressed = false; // TODO same in radima
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
      case ' ':
      keys.Space.pressed = false; // TODO same in radima
    }
  });

  robotSprite.src = "../img/robot.png";
  robotSprite.onload = () => {
    animationLoop();
  }
}
