const {ccclass, property} = cc._decorator;

import Plane from "./Plane";

@ccclass
export default class Main extends cc.Component {

    @property(Plane)
    plane: Plane = null;

    public start (): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);
        console.log(this.plane);
    }

    public update (dt) {
        /*if(cc.Intersection.rectRect()) {

        }*/
    }

    public onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.plane.onTap, this.plane);
    }
}
