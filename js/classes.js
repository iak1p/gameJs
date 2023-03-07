const cvs = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export class GameObject {
  constructor({ position, speed, sprite }) {
    this.position = position;
    this.speed = speed;
    this.sprite = sprite;
  }
}

export class Player extends GameObject {
  constructor({ position, speed, sprite, control }) {
    super({ position, speed, sprite });
    this.control = control;
  }

  move() {
    if (this.control.down) this.position.y = this.position.y - this.speed;
    if (this.control.up) this.position.y = this.position.y + this.speed;
    if (this.control.left) this.position.x = this.position.x - this.speed;
    if (this.control.right) this.position.x = this.position.x + this.speed;
    ctx.drawImage(this.sprite, this.position.x, this.position.y);
  }
}

export class Enemy extends GameObject {
  constructor({ position, speed, sprite, radius }) {
    super({ position, speed, sprite });
    this.radius = radius;
  }

  //   move() {
  //     if (control.down) this.position.y = this.position.y - this.speed;
  //     if (control.up) this.position.y = this.position.y + this.speed;
  //     if (control.left) this.position.x = this.position.x - this.speed;
  //     if (control.right) this.position.x = this.position.x + this.speed;
  //     ctx.drawImage(this.sprite, this.position.x, this.position.y);
  //   }
}

export class Bullet extends GameObject {
  constructor({ position, speed, sprite, view, cursorPos }) {
    super({ position, sprite, speed });
    this.view = view;
    this.cursorPos = cursorPos;
    this.vector = {
      x: 0,
      y: 0,
    };
  }

  shoot() {
    this.vector.x = this.cursorPos.x - this.position.x;
    this.vector.y = this.cursorPos.y - this.position.y;

    let length = Math.sqrt(
      this.vector.x * this.vector.x + this.vector.y * this.vector.y
    );

    this.vector.x = this.vector.x / length;
    this.vector.y = this.vector.y / length;

    this.position.x = this.position.x + this.vector.x * this.speed;
    this.position.y = this.position.y + this.vector.y * this.speed;

    // const angle = Math.atan2(
    //   this.cursorPos.y - this.position.y,
    //   this.cursorPos.x - this.position.x
    // );
    // this.position.x = this.position.x + Math.cos(angle) * this.velocity;
    // this.position.y = this.position.y + Math.sin(angle) * this.velocity;

    ctx.drawImage(this.sprite, this.position.x, this.position.y);
  }
}
