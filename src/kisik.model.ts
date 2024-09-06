import { makeAutoObservable } from "mobx";

export class KisikModel {
  x = 25;
  y = 30;

  constructor() {
    makeAutoObservable(this);
  }

  changeX(x: number) {
    this.x += x;
  }

  changeY(y: number) {
    this.y += y;
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