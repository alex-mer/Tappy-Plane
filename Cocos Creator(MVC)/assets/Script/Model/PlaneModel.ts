const {ccclass, property} = cc._decorator;

@ccclass
export default class PlaneModel extends cc.Component {
    @property
    public angle: number = 1;

    @property
    public gravity: number = 3;

    @property
    public jumpHeight: number = 150;

    @property
    public jumpDuration: number = 0.3;

    public updateRotation(plane: any): number {
        return plane.angle - this.angle;
    }

    public updatePosition(plane: any): number {
        return plane.position.y - this.gravity;
    }

    public onTap(plane: any): void {
	    const rotation = cc.rotateTo(0.3, 25).easing(cc.easeCubicActionOut());
        const up = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        
        plane.runAction(rotation);
        plane.runAction(up);
    }

    public stopPlaneActions(plane: any): void {
	    plane.stopAllActions();
    }
}