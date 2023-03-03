const cvs = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

  render() {
    ctx.clearRect(0, 0, 1026, 576);
    if (control.down) this.position.y = this.position.y - this.velocity;
    if (control.up) this.position.y = this.position.y + this.velocity;
    if (control.left) this.position.x = this.position.x - this.velocity;
    if (control.right) this.position.x = this.position.x + this.velocity;
    ctx.drawImage(this.sprite, this.position.x, this.position.y);
  }
}

const pl = new Image();
const bgi = new Image();
const borderSprite = new Image();
borderSprite.src = "./img/border.png";
pl.src = "./img/p.png";
bgi.src = "./img/bg.png";

const bg = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  sprite: bgi,
  velocity: 5,
});

const border = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  sprite: borderSprite,
  velocity: 5,
});

window.addEventListener("keydown", (e) => {
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

borderSprite.onload = () => {
  ctx.drawImage(pl, 500, 200);
};

function animate() {
  window.requestAnimationFrame(animate);
  bg.render();
  border.render();
  // ctx.drawImage(pl, 500, 200);
}

animate();
