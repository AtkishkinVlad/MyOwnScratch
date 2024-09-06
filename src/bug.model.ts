import { makeAutoObservable } from "mobx";
import { kisikModel } from "./kisik.model";
import { SingleToast } from "@skbkontur/react-ui";

function getRandom(list: number[]): number {
  return list[Math.floor((Math.random()*list.length))];
}

const initialX = [200, 260, -320];
const initialY = [100, -200, 300];

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

  checkKisikCatchMe() {
    const { x, y } = kisikModel.currentPosition

    if (equal(this.x, x, 15) && equal(this.y, y, 15)) {
      SingleToast.push('Кисик поймал баг')
      this.changeX(10_000)
      this.changeY(10_000)
      return true;
    }

    return false;
  }
}

export const bugModel = new BugModel();