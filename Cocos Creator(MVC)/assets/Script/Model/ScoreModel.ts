const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreModel extends cc.Component {
    private _score: number = 0;
    private _topScore: number = 0;

    public get score(): string {
        return this._score.toString();
    }

    public get topScore(): string {
        return this._topScore.toString();
    }

    public restartScore(): void {
        this._score = 0;
    }

    public updateScore(): void {
        this._score++;

        if(this._score > this._topScore) {
            this._topScore = this._score;
        }
    }
}
