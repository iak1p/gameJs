const cvs = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const PlayerX = 463,
  PlayerY = 238;

const control = {
  left: false,
  right: false,
  up: false,
  down: false,
};

class Sprite {
  constructor({ position, velocity, sprite }) {
    this.position = position;
    this.velocity = velocity;
    this.sprite = sprite;
  }

  move() {
    ctx.clearRect(0, 0, 1026, 576);
    if (control.down) this.position.y = this.position.y - this.velocity;
    if (control.up) this.position.y = this.position.y + this.velocity;
    if (control.left) this.position.x = this.position.x - this.velocity;
    if (control.right) this.position.x = this.position.x + this.velocity;
    ctx.drawImage(this.sprite, this.position.x, this.position.y);
  }
}

class Enemy extends Sprite {
  constructor({ position, velocity, sprite, radius }) {
    super({ position, velocity, sprite });
    this.radius = radius;
  }

  move() {
    // if (this.position.x - PlayerX < this.radius){
    //   this.position.x = this.position.x + this.velocity + 3
    // }
    if (control.down) this.position.y = this.position.y - this.velocity;
    if (control.up) this.position.y = this.position.y + this.velocity;
    if (control.left) this.position.x = this.position.x - this.velocity;
    if (control.right) this.position.x = this.position.x + this.velocity;
    ctx.drawImage(this.sprite, this.position.x, this.position.y);
  }
}

class Bullet extends Sprite {
  constructor({ position, velocity, sprite }) {
    super({ position, velocity, sprite });
  }

  shoot(){

  }
}

const pl = new Image();
const backgroundSprite = new Image();
const borderSprite = new Image();
const enemySprite = new Image();
enemySprite.src = "./img/e.png";
borderSprite.src = "./img/border.png";
pl.src = "./img/p.png";
backgroundSprite.src = "./img/bg.png";

const bg = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  sprite: backgroundSprite,
  velocity: 5,
});

const enemy = new Enemy({
  position: {
    x: 50,
    y: 30,
  },
  sprite: enemySprite,
  radius: 30,
  velocity: 5,
})


// const border = new Sprite({
//   position: {
//     x: 0,
//     y: 0,
//   },
//   sprite: borderSprite,
//   velocity: 5,
// });

window.addEventListener("keydown", (e) => {
  console.log(e.keyCode);
  switch (e.keyCode) {
    //map left
    case 68:
      control.left = true;
      break;
    //map rigth
    case 65:
      control.right = true;
      break;
    //map up
    case 87:
      control.up = true;
      break;
    //map down
    case 83:
      control.down = true;
      break;
    case 69: 

  }
});

window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    //map left
    case 68:
      control.left = false;
      break;
    //map rigth
    case 65:
      control.right = false;
      break;
    //map up
    case 87:
      control.up = false;
      break;
    case 83:
      control.down = false;
      break;
  }
});
// window.addEventListener("keydown", (e) => {
//   console.log(e.keyCode);
//   switch (e.keyCode) {
//     //map left
//     case 68:
//       control.right = true;
//       break;
//     //map rigth
//     case 65:
//       control.left = true;
//       break;
//     //map up
//     case 83:
//       control.up = true;
//       break;
//     //map down
//     case 87:
//       control.down = true;
//       break;
//   }
// });

// window.addEventListener("keyup", (e) => {
//   switch (e.keyCode) {
//     //map left
//     case 68:
//       control.right = false;
//       break;
//     //map rigth
//     case 65:
//       control.left = false;
//       break;
//     //map up
//     case 83:
//       control.up = false;
//       break;
//     case 87:
//       control.down = false;
//       break;
//   }
// });

borderSprite.onload = () => {
  ctx.drawImage(pl, PlayerX, PlayerY);
};

function animate() {
  window.requestAnimationFrame(animate);
  bg.move();
  enemy.move();
  ctx.drawImage(pl, PlayerX, PlayerY);
  // border.render()
  if (bg.position.x) {

  }
}

animate();
