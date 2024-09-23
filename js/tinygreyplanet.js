window.onload = () => {
  const world = document.querySelector('#game');
  const canvasContext = world.getContext('2d');

  world.width = world.clientWidth;
  world.height = world.clientHeight;

  const polarCenterX = world.width / 2;
  const polarCenterY = world.height * 2;

  const keys = {
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    Space: { pressed: false }
  }

  class Planet {
    constructor(r, a, s, c) {
      this.centerRadius = r;
      this.centerAngle = a;
      this.size = s;
      this.color = c;
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
      canvasContext.stroke();
      canvasContext.fillStyle = this.color;
      canvasContext.fill();
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
      this.drawWidth = 32;
      this.drawHeight = 32;
    }

    draw() {
      canvasContext.fillStyle = "red";
      canvasContext.fillRect(polarCenterX + this.positionRadius * Math.cos(this.positionAngle) - this.drawWidth / 2, polarCenterY + this.positionRadius * Math.sin(this.positionAngle) - this.drawHeight, this.drawWidth, this.drawHeight);
    }

    update() {
      this.positionRadius = this.positionRadius + this.velocityRadius;
      if (this.positionRadius > polarCenterY / 1.5) {
        this.velocityRadius = this.velocityRadius - 0.1;
      } else {
        this.positionRadius = polarCenterY / 1.5;
        this.velocityRadius = 0;
      }
    }

    jump() {
      this.velocityRadius = 2;
    }
  }
  
  const planet = new Planet(0, 0, polarCenterY / 1.5, "grey")
  const stars = Array.from(Array(100), (_, number) => new Planet(polarCenterY / 1.5 + number * 5 * Math.random(), Math.random() * 2 * Math.PI, 1, "white"));
  const player = new Player(polarCenterY / 1.5, Math.PI * 3 / 2);

  const animationLoop = () => {
    requestAnimationFrame(animationLoop);
    canvasContext.clearRect(0, 0, world.width, world.height);
    planet.draw();
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
      player.jump();
    }
  });

  animationLoop();
}
