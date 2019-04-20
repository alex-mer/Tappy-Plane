const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScreenView extends cc.Component {
    @property(cc.Label)
    public topScoreLabel: cc.Label = null;

    public startGame(): void {
        this.node.active = false;
        this.node.opacity = 0;
        
        this.node.getComponent(cc.Animation).play();
    }

    public show(): void {
        this.node.active = true;
    }

    public updateTopScore(value: string): void {
        this.topScoreLabel.getComponent(cc.Label).string = 'Top Score ' + value;
    }
}
