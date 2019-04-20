const {ccclass, property} = cc._decorator;

@ccclass
export default class PlaneView extends cc.Component {
    public onCollisionEnter: Function;

    public setY(y: number): void {
        this.node.y = y;
    }

    public setAngle(angle: number): void {
        this.node.angle = angle;
    }

    public playSound(): void {
        this.getComponent(cc.AudioSource).play();
    }

    public playAnimation(): void {
        this.getComponent(cc.Animation).play();
    }

    public hide(): void {
        this.getComponent(cc.Animation).stop();
        this.node.active = false;
    }

    public restart(): void {
        this.node.x = 0;
        this.node.y = 0;
        this.node.angle = 0;
        this.node.active = true;
    }
}
