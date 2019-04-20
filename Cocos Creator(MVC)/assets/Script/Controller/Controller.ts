import Model from "../Model/Model";
import View from "../View/View";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Controller {
    private _model: Model = null;
    private _view: View = null;

    public constructor(model: Model, view: View) {
        this._model = model;
        this._view = view;

        this._model.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);
        this._model.rock.node.on('update-score', this.onUpdateScore, this);
        this._view.plane.onCollisionEnter = this._gameOver.bind(this);
    }

    public update(dt: number): void {
        if(this._model.state === 'game') {
            this._view.groundBottom1.setX( this._model.ground.updatePosition(this._view.groundBottom1.node, dt) );
            this._view.groundBottom2.setX( this._model.ground.updatePosition(this._view.groundBottom2.node, dt) );
            this._view.groundTop1.setX( this._model.ground.updatePosition(this._view.groundTop1.node, dt) );
            this._view.groundTop2.setX( this._model.ground.updatePosition(this._view.groundTop2.node, dt) );
            this._view.plane.setAngle( this._model.plane.updateRotation(this._view.plane.node) );
            this._view.plane.setY( this._model.plane.updatePosition(this._view.plane.node) );
            this._view.rock.setPosition( this._model.rock.updatePosition(this._view.rock.node, dt) );
        }
    }

    public onUpdateScore(): void {
        this._model.score.updateScore();
        this._view.score.set( this._model.score.score);
    }

    private _startGame(): void {
        this._model.node.off(cc.Node.EventType.TOUCH_START, this._startGame, this);
        this._model.node.on(cc.Node.EventType.TOUCH_START, this._onTap, this);

        this._view.startScreen.startGame();

        this._model.state = 'game';

        this._view.plane.playAnimation();
        this._view.plane.playSound();

        this._view.score.show();
    }

    private _gameOver(): void {
        this._model.state = 'end';
        this._model.score.restartScore();

        this._view.camera.vibration();

        this._model.node.off(cc.Node.EventType.TOUCH_START, this._onTap, this._view.plane);

        this._view.plane.hide();

        this._view.explosion.playAnimation();
        this._view.explosion.show();
        this._view.explosion.setPosition(this._view.plane.node.x, this._view.plane.node.y);
        this._view.explosion.playSound();

        this._model.scheduleOnce(() => {
            this._restart();
        }, 0.5);
    }

    private _restart(): void {
        this._model.plane.stopPlaneActions(this._view.plane.node);
        this._view.plane.restart();

        this._view.startScreen.show();
        this._view.startScreen.updateTopScore(this._model.score.topScore);
        this._view.score.hide();

        this._view.explosion.hide();

        this._view.rock.setPosition( this._model.rock.toStart() );

        this._model.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);
    }

    private _onTap(): void {
        this._model.plane.onTap(this._view.plane.node);
    }
}
