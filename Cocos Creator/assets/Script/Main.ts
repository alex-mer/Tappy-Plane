const {ccclass, property} = cc._decorator;

import Plane from "./Plane";
import Ground from "./Ground";
import Rock from "./Rock";

@ccclass
export default class Main extends cc.Component {

    @property(Plane)
    plane: Plane = null;

    @property(cc.Node)
    ground: cc.Node = null;

    @property(cc.Node)
    scoreLabel: cc.Node = null;

    @property(cc.Node)
    topScoreLabel: cc.Node = null;

    @property(cc.Node)
    startScreen: cc.Node = null;

    public state: string = 'start';
    public score: number = 0;
    public topScore: number = 0;

    public start (): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);
    }

    public update (dt) {
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
        this.score += 0.5;
        this.scoreLabel.getComponent(cc.Label).string = String(this.score);

        if(this.score > this.topScore) {
            this.topScore = this.score;
        }
    }

    public gameOver(): void {
        this.state = 'end';

        this.plane.stopActions();
        this.plane.node.x = 480;
        this.plane.node.y = 320;
        this.plane.node.rotation = 0;

        for (let i = 0; i < this.ground.children.length; i++) {
            if (this.ground.children[i].getComponent(Rock)) {
                this.ground.children[i].getComponent(Rock).toStart();
            }
        }
        
        this.startScreen.active = true;
        this.scoreLabel.active = false;
        this.topScoreLabel.getComponent(cc.Label).string = 'Top Score ' + this.topScore;

        this.node.off(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);
        this.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);
    }

    private _startGame(): void {
        this.state = 'game';
        this.startScreen.active = false;
        this.scoreLabel.active = true;

        this.score = 0;
        this.scoreLabel.getComponent(cc.Label).string = String(this.score);

        this.node.off(cc.Node.EventType.TOUCH_START, this._startGame, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);
    }
}
