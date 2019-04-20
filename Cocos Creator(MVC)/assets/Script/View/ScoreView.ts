const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreView extends cc.Component {
    public show(): void {
        this.node.active = true;
        this.node.getComponent(cc.Label).string = '0';
    }

    public hide(): void {
        this.node.active = false;
    }

    public set(value: string): void {
        this.node.getComponent(cc.Label).string = value;
    }
}
