import { makeAutoObservable } from "mobx";

export class GameModel {
	private score = 0;

	constructor() {
		makeAutoObservable(this);
	}

	changeScore(score: number) {
		this.score += score;
	}

	get currentScore() {
		return this.score;
	}

	get isWinScore() {
		return this.score === 99;
	}
}

export const gameModel = new GameModel();
