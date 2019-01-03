const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component {

    @property
    speed: number = 120;

    onLoad () {
	    cc.director.getCollisionManager().enabled = true;
    }

    //start () {}

    public update (dt) {
        this.node.setPosition( this.node.position.x -= this.speed * dt, this.node.position.y);
        if( this.node.position.x <= -(this.node.width) ){
	        this.node.setPosition(2 * this.node.width + this.node.position.x, this.node.position.y);
        }

    }

	public onCollisionEnter(other, self) {
		cc.game.pause();
	}
}
