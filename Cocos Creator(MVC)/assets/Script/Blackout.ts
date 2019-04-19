const {ccclass, property} = cc._decorator;

@ccclass
export default class Blackout extends cc.Component {
    @property
    public width: number = 100;

    @property
    public height: number = 100;

    public start (): void {
        const ctx = this.getComponent(cc.Graphics);
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
}
