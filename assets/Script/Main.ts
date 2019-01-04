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
    startScreen: cc.Node = null;

    public state: string = 'start';

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

    public gameOver(): void {
        this.state = 'end';

        this.plane.node.x = 480;
        this.plane.node.y = 320;
        this.plane.node.rotation = 0;
        
        this.startScreen.active = true;

        this.node.off(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);
        this.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);
    }

    private _startGame(): void {
        this.state = 'game';
        this.startScreen.active = false;

        this.node.off(cc.Node.EventType.TOUCH_START, this._startGame, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);
    }
}
