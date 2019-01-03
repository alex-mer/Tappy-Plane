const {ccclass, property} = cc._decorator;
import StartScreen from "./StartScreen";

@ccclass
export default class Plane extends cc.Component {

    @property(Number)
    jumpHeight: number = 40;

    @property(Number)
    jumpDuration: number = 0.3;

    @property(Number)
    gravity: number = 2;

    @property(Number)
    rotation: number = 1;

	@property(StartScreen)
	startScreen: StartScreen = null;

    public update(): void {
	    if( this.startScreen.getVisibled() ) return;

	    this.node.y -= this.gravity;
        this.node.rotation += this.rotation;
    }

    public onTap(): void {
	    if( this.startScreen.getVisibled() ) return;

	    const rotation = cc.rotateTo(0.3, -25).easing(cc.easeCubicActionOut());
        const up = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        this.node.runAction(rotation);
        this.node.runAction(up);
    }
}
