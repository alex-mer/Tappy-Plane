const {ccclass, property} = cc._decorator;

@ccclass
export default class Plane extends cc.Component {
    @property
    public jumpHeight: number = 40;

    @property
    public jumpDuration: number = 0.3;

    @property
    public gravity: number = 2;

    @property
    public rotation: number = 1;

    public onCollisionEnter: Function;

    public onUpdate(): void {
	    this.node.y -= this.gravity;
        this.node.angle -= this.rotation;
    }

    public stopActions(): void {
	    this.node.stopAllActions();
    }

    public onTap(): void {
	    const rotation = cc.rotateTo(0.3, 25).easing(cc.easeCubicActionOut());
        const up = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        this.node.runAction(rotation);
        this.node.runAction(up);

        this.getComponent(cc.AudioSource).play();
    }
}
