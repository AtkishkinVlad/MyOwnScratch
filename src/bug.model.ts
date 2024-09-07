import { makeAutoObservable } from "mobx";
import { kisikModel } from "./kisik.model";
import { SingleToast } from "@skbkontur/react-ui";
import { gameModel } from "./game.model";

function getRandom(list: number[]): number {
  return list[Math.floor((Math.random()*list.length))];
}

const initialX = [100, 170, -140, 130, 220, 22, 74, -74, -220, 280];
const initialY = [100, 150, -130, 220, 22, 74, -74, -220, 280, 190];

function equal(firstValue: number, secondValue: number, dispense: number): boolean {
  return Math.abs(firstValue - secondValue) <= dispense;
}

export class BugModel {
  x = getRandom(initialX);
  y = getRandom(initialY);
  worth: number;

  constructor(worth: number) {
    this.worth = worth;
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
      SingleToast.push('Котик поймал баг 😸')
      this.removeBug();
      gameModel.changeScore(this.worth)
      return true;
    }

    return false;
  }
}

// Сумма должна быть 99
export const bugModelFirst = new BugModel(22);
export const bugModelSecond = new BugModel(19);
export const bugModelThird = new BugModel(58);
