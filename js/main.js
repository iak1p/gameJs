import { GameObject, Player, Enemy, Bullet } from "./classes.js";

const cvs = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const playerSprite = new Image();
const backgroundSprite = new Image();
const borderSprite = new Image();
const enemySprite = new Image();
const bulletSprite = new Image();
bulletSprite.src = "./img/bullet.png";
enemySprite.src = "./img/e.png";
borderSprite.src = "./img/border.png";
playerSprite.src = "./img/p.png";
backgroundSprite.src = "./img/bg.png";
bulletSprite.classList = "fff";

let bullet = [];
let shoot = false;
let isShooting = false;

const control = {
  left: false,
  right: false,
  up: false,
  down: false,
};

const player = new Player({
  position: {
    x: 100,
    y: 100,
  },
  sprite: playerSprite,
  speed: 8,
  control: control,
});

const enemy = new Enemy({
  position: {
    x: 50,
    y: 30,
  },
  sprite: enemySprite,
  radius: 30,
  speed: 5,
});

// const border = new Sprite({
//   position: {
//     x: 0,
//     y: 0,
//   },
//   sprite: borderSprite,
//   velocity: 5,
// });

window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    //player right
    case 68:
      control.right = true;
      break;
    //player left
    case 65:
      control.left = true;
      break;
    //player up
    case 83:
      control.up = true;
      break;
    //player down
    case 87:
      control.down = true;
      break;
  }
});


cvs.addEventListener("mousedown", (e) => {
  isShooting = true;
  console.log(isShooting);

  const bullet1 = new Bullet({
    position: {
      x: player.position.x,
      y: player.position.y,
    },
    sprite: bulletSprite,
    speed: 20,
    cursorPos: {
      x: e.x,
      y: e.y,
    },
  });
  bullet.push(bullet1);
  setTimeout(() => {
    bullet.shift();
  }, 1000);

  
});

cvs.addEventListener("mouseup", (e) => {
  isShooting = false;
  console.log(isShooting);
});

window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 68:
      control.right = false;
      break;
    case 65:
      control.left = false;
      break;
    case 83:
      control.up = false;
      break;
    case 87:
      control.down = false;
      break;
  }
});

function animate() {
  ctx.clearRect(0, 0, 1026, 576);

  ctx.drawImage(backgroundSprite, 0, 0);
  ctx.drawImage(borderSprite, 0, 0);
  ctx.drawImage(enemySprite, 50, 50);
  // ctx.drawImage(borderSprite, 0, 0);
  // border.render()
  // if (bg.position.x) {
  // }
  player.move();
  if (bullet.length != 0) {
    bullet.forEach((el) => {
      el.shoot();
    });
  }
  requestAnimationFrame(animate);
}

animate();
