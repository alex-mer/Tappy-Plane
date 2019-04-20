const {ccclass, property} = cc._decorator;

@ccclass
export default class ExplosionView extends cc.Component {
    public setPosition(x: number, y: number): void {
        this.node.x = x;
        this.node.y = y;
    }

    public show(): void {
        this.node.active = true;
    }

    public hide(): void {
        this.node.active = false;
    }

    public playAnimation(): void {
        this.getComponent(cc.Animation).play();
    }

    public playSound(): void {
        this.getComponent(cc.AudioSource).play();
    }
}
