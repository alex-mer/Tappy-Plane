const {ccclass, property} = cc._decorator;

import Plane from "./Plane";
import Ground from "./Ground";
import Rock from "./Rock";

@ccclass
export default class Main extends cc.Component {
    @property(cc.Node)
    public camera: cc.Node = null;

    @property(Plane)
    public plane: Plane = null;

    @property(cc.Node)
    public explosion: cc.Node = null;

    @property(cc.Node)
    public ground: cc.Node = null;

    @property(cc.Node)
    public scoreLabel: cc.Node = null;

    @property(cc.Node)
    public topScoreLabel: cc.Node = null;

    @property(cc.Node)
    public startScreen: cc.Node = null;

    public state: string = 'start';
    public score: number = 0;
    public topScore: number = 0;

    public onLoad (): void {
	    cc.director.getCollisionManager().enabled = true;
    }

    public start (): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);

        this.plane.onCollisionEnter = this._gameOver.bind(this);
    }

    public update (dt: number) {
        if(this.state === 'game') {
            this.plane.onUpdate();

            for (let i = 0; i < this.ground.children.length; i++) {
                if (this.ground.children[i].getComponent(Ground)) {
                    this.ground.children[i].getComponent(Ground).onUpdate(dt);
                } else {
                    this.ground.children[i].getComponent(Rock).onUpdate(dt);
                }
            }
        }
    }

    public updateScore(): void {
        this.score++;
        this.scoreLabel.getComponent(cc.Label).string = String(this.score);

        if(this.score > this.topScore) {
            this.topScore = this.score;
        }
    }

    private _gameOver(): void {
        this.state = 'end';

        this._vibration();

        this.node.off(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);

        this.plane.getComponent(cc.Animation).stop();
        this.plane.node.active = false;
        this.explosion.getComponent(cc.Animation).play();
        this.explosion.active = true;
        this.explosion.x = this.plane.node.x;
        this.explosion.y = this.plane.node.y;

        this.explosion.getComponent(cc.AudioSource).play();

        this.scheduleOnce(function() {
            this._restart();
        }, 0.5);
    }

    private _restart(): void {
        this.plane.stopActions();
        this.plane.node.x = 0;
        this.plane.node.y = 0;
        this.plane.node.angle = 0;
        this.plane.node.active = true;

        this.explosion.active = false;

        this.startScreen.active = true;
        this.scoreLabel.active = false;
        this.topScoreLabel.getComponent(cc.Label).string = 'Top Score ' + this.topScore;

        for (let i = 0; i < this.ground.children.length; i++) {
            if (this.ground.children[i].getComponent(Rock)) {
                this.ground.children[i].getComponent(Rock).toStart();
            }
        }

        this.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);
    }

    private _startGame(): void {
        this.state = 'game';
        this.startScreen.active = false;
        this.scoreLabel.active = true;
        this.startScreen.opacity = 0;
        this.startScreen.getComponent(cc.Animation).play();

        this.score = 0;
        this.scoreLabel.getComponent(cc.Label).string = String(this.score);

        this.node.off(cc.Node.EventType.TOUCH_START, this._startGame, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);

        this.plane.getComponent(cc.Animation).play();
        this.plane.getComponent(cc.AudioSource).play();
    }

    private _vibration(): void {
        this.camera.getComponent(cc.Animation).play();
    }
}
