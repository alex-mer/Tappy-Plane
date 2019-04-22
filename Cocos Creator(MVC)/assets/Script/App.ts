import Model from "./Model/Model";
import View from "./View/View";
import Controller from "./Controller/Controller";

const {ccclass, property} = cc._decorator;

@ccclass
export default class App extends cc.Component {
    private _model: Model = null;
    private _view: View = null;
    private _controller: Controller = null;

    public onLoad(): void {
        cc.director.getCollisionManager().enabled = true;
    }

    public start(): void {
        this._model = this.getComponent(Model);
        this._view = this.getComponent(View);
        this._controller = new Controller(this._model, this._view);

        this._event();
    }

    public update(dt): void {
        this._controller.update(dt);
    }

    private _event(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);
        this._controller.rockController.model.node.on('update-score', this._controller.scoreController.onUpdateScore, this._controller.scoreController);
        this._controller.planeController.view.onCollisionEnter = this._gameOver.bind(this);
    }

    private _startGame(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this._startGame, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this._controller.planeController.onTap, this._controller.planeController);

        this._controller.startGame();
    }

    private _gameOver(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this._controller.planeController.onTap, this._controller.planeController);

        this._controller.gameOver();

        this.scheduleOnce(() => {
            this._restart();
        }, 0.5);
    }

    private _restart(): void {
        this._model.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);

        this._controller.restart();
    }
}
