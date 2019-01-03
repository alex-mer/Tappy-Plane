const {ccclass, property} = cc._decorator;

import Plane from "./Plane";

@ccclass
export default class Main extends cc.Component {

    @property(Plane)
    plane: Plane = null;

    @property(cc.Sprite)
    ground: cc.Sprite = null;

    private _planePolygon: any;
    private _groundPolygon: any;

    public start (): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this._planePolygon = this.plane.getComponent(cc.CircleCollider).world;
        this._groundPolygon = this.ground.getComponent(cc.PolygonCollider).world.points;
    }

    public update (dt) {
        if(cc.Intersection.polygonCircle(this._groundPolygon, this._planePolygon)) {
            console.log('hit');
        }
    }

    public onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);
    }
}
