const {ccclass, property} = cc._decorator;

@ccclass
export default class RockView extends cc.Component {
    public setPosition(pos: any): void {
        this.node.x = pos.x;
        this.node.y = pos.y;
    }
}
