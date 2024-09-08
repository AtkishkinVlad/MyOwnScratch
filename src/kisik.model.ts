import { makeAutoObservable } from "mobx";

export class KisikModel {
  x = 25;
  y = 25;

  constructor() {
    makeAutoObservable(this);
  }

  changeX(x: number) {
    if (this.x + x < 550 && this.x - x > -550) {
      this.x += x;
    }
  }

  changeY(y: number) {
    if (this.y + y < 550 && this.y - y > -550) {
      this.y += y;
    }
  }

  get currentX() {
    return this.x;
  }

  get currentY() {
    return this.y;
  }

  get currentPosition() {
    return { x: this.x, y: this.y }
  }
}

export const kisikModel = new KisikModel();