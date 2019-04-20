const {ccclass, property} = cc._decorator;

@ccclass
export default class GroundView extends cc.Component {
    public setX(x: number): void {
        this.node.x = x;
    }
}
