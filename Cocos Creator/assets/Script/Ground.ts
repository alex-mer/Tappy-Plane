const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component {
    @property
    public speed: number = 120;

    private _gap: number = 100;

    public onUpdate (dt: number) {
        this.node.setPosition(this.node.position.x -= this.speed * dt, this.node.position.y);
        if( this.node.position.x <= -(this.node.width + this._gap) ) {
	        this.node.setPosition(2 * this.node.width + this.node.position.x, this.node.position.y);
        }
    }
}
