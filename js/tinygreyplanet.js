window.onload = () => {
  const world = document.querySelector('#game');
  const canvasContext = world.getContext('2d');

  world.width = world.clientWidth;
  world.height = world.clientHeight;

  const polarCenterX = world.width / 2;
  const polarCenterY = world.height * 2;
  const planetRadius = polarCenterY / 1.5;

  let imageNameArray = ["robot.png", "text.png"];
  let imagesLoaded = 0;
  let startTime;
  let elapsedTime;

  const keys = {
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    Space: { pressed: false }
  }

  const drawTextFromSprite = (colorNumber, text, x, y, size) => {
    text.split("").forEach((character, i) => {
      let offsetX = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!".indexOf(character.toUpperCase()) * 8;
      let offsetY = colorNumber * 24;
      if (offsetX >= 0) {
        canvasContext.imageSmoothingEnabled = false;
        canvasContext.drawImage(imageArray[1], offsetX, offsetY, 8, 8, x + i * size, y, size, size);
      }
    });
  }

  const drawTextCenter = (colorNumber, text, offsetY, size) => {
    drawTextFromSprite(colorNumber, text, (world.width - text.length * size) / 2, (world.height - size) / 2 + offsetY, size)
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
        this.centerAngle = this.centerAngle - 0.01;
      } else if (keys.ArrowRight.pressed) {
        this.centerAngle = this.centerAngle + 0.01;
      }
    }

    draw() {
      canvasContext.beginPath();
      canvasContext.arc(polarCenterX + this.centerRadius * Math.cos(this.centerAngle), polarCenterY - this.centerRadius * Math.sin(this.centerAngle), this.size, 0, 2 * Math.PI, false);
      if (this.fill) {
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
      } else {
        canvasContext.strokeStyle = this.color;
        canvasContext.stroke();
      }
    }
  }

  class Target extends RoundObject {
    update(missiles, player) {
      super.update();
      return missiles.some(m => this.collide(m.centerRadius, m.centerAngle)) || this.collide(player.positionRadius + player.drawHeight / 2, player.positionAngle);
    }

    collide(posRad, posAng) {
      let x = posRad * Math.cos(posAng);
      let y = posRad * Math.sin(posAng);
      let centerX = this.centerRadius * Math.cos(this.centerAngle);
      let centerY = this.centerRadius * Math.sin(this.centerAngle);

      return x < centerX + this.size && x > centerX - this.size && y < centerY + this.size && y > centerY - this.size;
    }
  }

  class Missile extends RoundObject {
    constructor(r, a, s, c, v) {
      super(r, a, s, c);
      this.velocityAng = v;
      this.life = 50;
    }

    update() {
      super.update();
      this.life--;
      this.centerAngle = this.centerAngle + this.velocityAng;
      return this.life === 0;
    }
  }

  const missiles = [];

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
      this.groundRadius = r;
      this.drawWidth = 27;
      this.drawHeight = 33;
      this.spriteOffsetX = 0;
      this.spriteOffsetY = 0;
      this.spriteCroppedWidth = 27;
      this.spriteCroppedHeight = 33;
      this.missilesLeft = 15;
      this.missileReady = true;
    }

    draw() {
      canvasContext.drawImage(imageArray[0], this.spriteOffsetX, this.spriteOffsetY, this.spriteCroppedWidth, this.spriteCroppedHeight, polarCenterX + this.positionRadius * Math.cos(this.positionAngle) - this.drawWidth / 2, polarCenterY - this.positionRadius * Math.sin(this.positionAngle) - this.drawHeight, this.drawWidth, this.drawHeight);
      drawTextFromSprite(2, `${this.missilesLeft}`, world.width / 2 - 100, world.height - 16, 16);
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
      if (keys.Space.pressed && this.missileReady && this.missilesLeft > 0) {
        missiles.push(new Missile(this.positionRadius + this.drawHeight / 2, this.positionAngle, 4, "yellow", this.spriteOffsetX === 0 ? -0.02 : 0.02));
        this.missileReady = false;
        this.missilesLeft--;
      }
      if (!keys.Space.pressed) {
        this.missileReady = true;
      }
      this.positionRadius = this.positionRadius + this.velocityRadius;
      if (this.positionRadius > this.groundRadius) {
        this.velocityRadius = this.velocityRadius - 0.1;
      } else {
        this.positionRadius = this.groundRadius;
        this.velocityRadius = 0;
      }
    }
  }
  
  const planet = new RoundObject(0, 0, planetRadius, "grey")
  const craters = Array.from(Array(100), (_, number) => new RoundObject(planetRadius - number * 5 * Math.random(), Math.random() * 2 * Math.PI, 20 * Math.random(), "black", Math.random() > 0.5));
  const stars = Array.from(Array(100), (_, number) => new RoundObject(planetRadius + number * 5 * Math.random(), Math.random() * 2 * Math.PI, 1, "white"));
  const targets = Array.from(Array(10), (_, number) => new Target(planetRadius + 20 + number * 50 * Math.random(), Math.random() * 2 * Math.PI, 15, "red"));
  const player = new Player(planetRadius, Math.PI / 2);

  const formatTime = (time) => {
    let minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    let seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    return `${minutes} ${seconds} ${time.getMilliseconds()}`;
  }

  const animationLoop = () => {
    canvasContext.clearRect(0, 0, world.width, world.height);
    if (targets.length === 0) {
      drawTextCenter(0, "COMPLETE!", 0, 40);
    } else {
      requestAnimationFrame(animationLoop);
    }
    planet.draw();
    craters.forEach(c => {
      c.update();
      c.draw()
    });
    stars.forEach(s => {
      s.update();
      s.draw()
    });
    for (let i = 0; i < missiles.length; i++) {
      missiles[i].draw();
      if (missiles[i].update()) {
        missiles.splice(i, 1);
      }
    }
    for (let i = 0; i < targets.length; i++) {
      targets[i].draw();
      if (targets[i].update(missiles, player)) {
        targets.splice(i, 1);
      }
    }
    player.update();
    player.draw();
    elapsedTime = new Date(new Date() - startTime);
    drawTextFromSprite(7, formatTime(elapsedTime), world.width / 2, world.height - 16, 16);
    drawTextFromSprite(0, `${targets.length}`, world.width / 2 - 200, world.height - 16, 16);
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
      keys.Space.pressed = true;
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
      keys.Space.pressed = false;
    }
  });

  let imageArray = imageNameArray.map(name => {
    let img = new Image();
    img.src = "../img/" + name;
    img.onload = () => {
      imagesLoaded++;
      if(imagesLoaded === imageNameArray.length) {
        startTime = new Date();
        animationLoop();
      }
    }
    return img;
  });
}
