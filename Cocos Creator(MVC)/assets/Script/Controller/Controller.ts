import Model from "../Model/Model";
import View from "../View/View";
import GroundController from "./GroundController";
import PlaneController from "./PlaneController";
import RockController from "./RockController";
import ScoreController from "./ScoreController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Controller {
    public groundController: GroundController = null;
    public planeController: PlaneController = null;
    public rockController: RockController = null;
    public scoreController: ScoreController = null;

    private _model: Model = null;
    private _view: View = null;

    public constructor(model: Model, view: View) {
        this._model = model;
        this._view = view;

        this.groundController = new GroundController(this._model.ground, [this._view.groundBottom1, this._view.groundBottom2, 
                                                                           this._view.groundTop1, this._view.groundTop2]);
        this.planeController = new PlaneController(this._model.plane, this._view.plane);
        this.rockController = new RockController(this._model.rock, this._view.rock);
        this.scoreController = new ScoreController(this._model.score, this._view.score);
    }

    public update(dt: number): void {
        if(this._model.state === 'game') {
            this.groundController.update(dt);
            this.planeController.update(dt);
            this.rockController.update(dt);
        }
    }

    public startGame(): void {
        this._model.state = 'game';
        this._view.startScreen.startGame();
        this.planeController.startGame();
        this.scoreController.startGame();
    }

    public gameOver(): void {
        this._model.state = 'end';
        this.scoreController.gameOver();
        this.planeController.gameOver();
        this._view.camera.vibration();
        this._view.explosion.playAnimation();
        this._view.explosion.show();
        this._view.explosion.setPosition(this._view.plane.node.x, this._view.plane.node.y);
        this._view.explosion.playSound();
    }

    public restart(): void {
        this.planeController.restart();
        this.rockController.restart();
        this.scoreController.restart();
        this._view.startScreen.show();
        this._view.startScreen.updateTopScore(this._model.score.topScore);
        this._view.explosion.hide();
    }
}
