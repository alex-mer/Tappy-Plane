const {ccclass, property} = cc._decorator;

@ccclass
export default class Plane extends cc.Component {

    @property(Number)
    jumpHeight: number = 300;

    @property(Number)
    jumpDuration: number = 0.3;

    @property(Number)
    gravity: number = 5;

    @property(Number)
    rotation: number = 1;

    public onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTap, this);
    }

    public update(): void {
        this.node.y -= this.gravity;
        this.node.rotation += this.rotation;
    }

    public onDestroy(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTap, this);
    }

    private _onTap(): void {
        const rotation = cc.rotateTo(0.3, -25).easing(cc.easeCubicActionOut());
        const up = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        this.node.runAction(rotation);
        this.node.runAction(up);
    }
}
