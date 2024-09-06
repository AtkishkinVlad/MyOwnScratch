import { makeAutoObservable } from "mobx";
import { kisikModel } from "./kisik.model";
import { SingleToast } from "@skbkontur/react-ui";

function getRandom(list: number[]): number {
  return list[Math.floor((Math.random()*list.length))];
}

const initialX = [100, 170, -140];
const initialY = [100, -100, 150];

function equal(firstValue: number, secondValue: number, dispense: number): boolean {
  return Math.abs(firstValue - secondValue) <= dispense;
}

export class BugModel {
  x = getRandom(initialX);
  y = getRandom(initialY);

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

  removeBug() {
    this.x = Infinity;
    this.y = Infinity;
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

  checkKisikCatchMe() {
    const { x, y } = kisikModel.currentPosition

    if (equal(this.x, x, 15) && equal(this.y, y, 15)) {
      SingleToast.push('Кисик поймал баг')
      this.removeBug()
      return true;
    }

    return false;
  }
}

export const bugModel = new BugModel();