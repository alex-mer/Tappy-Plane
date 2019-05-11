import Main from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component {
    @property(cc.Node)
    public main: cc.Node = null;

    @property
    public speed: number = 120;

    @property
    public startPosition: number = 1100;

    @property
    public endPosition: number = -700;

    private _scorePosition: number = -200;
    private _active: boolean =  true;

    public onUpdate (dt: number) {
        this.node.setPosition(this.node.position.x -= this.speed * dt, this.node.position.y);
        if(this.node.position.x < this.endPosition) {
            this.node.setPosition(this.startPosition, this._getRandomY());
            this._active = true;
        }
        
        if(this._active && this.node.position.x < this._scorePosition) {
            this.main.getComponent(Main).updateScore();
            this._active = false;
        }
    }
    
    public toStart(): void {
        this.node.setPosition(this.startPosition, this._getRandomY());
        this._active = true;
    }

    private _getRandomY(): number {
        return (Math.random() * 300) - 150;
    }
}