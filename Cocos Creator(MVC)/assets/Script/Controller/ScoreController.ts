import ScoreModel from "../Model/ScoreModel";
import ScoreView from "../View/ScoreView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreController {
    private _model: ScoreModel;
    private _view: ScoreView;

    public constructor(model: ScoreModel, view: ScoreView) {
        this._model = model;
        this._view = view;
    }

    public onUpdateScore(): void {
        this._model.updateScore();
        this._view.set( this._model.score);
    }

    public startGame(): void {
        this._view.show();
    }

    public gameOver(): void {
        this._model.restartScore();
    }

    public restart(): void {
        this._view.hide();
    }
}
