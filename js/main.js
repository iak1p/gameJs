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

// const audio = new Audio("../audio/PIU.mp3");

let bullet = [];
let enemys = [];
let isShooting = false,
  lose = false;

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

for (let i = 0; i < 4; i++) {
  const enemy = new Enemy({
    position: {
      x: Math.floor(Math.random() * 1024),
      y: Math.floor(Math.random() * 524),
    },
    sprite: enemySprite,
    radius: 30,
    speed: 2,
  });

  enemys.push(enemy);
}

// console.log(enemy.randomPos);
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

const shot = (e) => {
  const bullet1 = new Bullet({
    position: {
      x: player.position.x + 12,
      y: player.position.y + 12,
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

  // if (isShooting) setTimeout(shot(e), 1000);
};

cvs.addEventListener("mousedown", (e) => {
  const audio = new Audio("../audio/piu3.mp3");
  isShooting = true;
  console.log(isShooting);
  audio.play();
  audio.volume = 0.1
  shot(e);
});

cvs.addEventListener("mouseup", () => {
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
    case 69:
      lose = true;
      const audio = new Audio("../audio/lose.mp3");
      audio.play();
      console.log("???????????? ???? ??????????");
      break;
  }
});

function animate() {
  ctx.clearRect(0, 0, 1026, 576);

  ctx.drawImage(backgroundSprite, 0, 0);
  ctx.drawImage(borderSprite, 0, 0);
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

  if (enemys.length != 0) {
    enemys.forEach((el) => {
      el.randomMove();
    });
  }

  // enemy.randomMove();
  requestAnimationFrame(animate);
}

animate();
