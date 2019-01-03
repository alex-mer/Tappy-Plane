const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component {

    @property
    speed: number = 120;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
	    cc.director.getCollisionManager().enabledDebugDraw = true;
	    cc.director.getCollisionManager().enabled = true;
	    cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }

    //start () {}

    public update (dt) {
        this.node.setPosition( this.node.position.x -= this.speed * dt, this.node.position.y);
        if( this.node.position.x <= -(this.node.width) )
            this.node.setPosition(this.node.width - 1, this.node.position.y);
    }

	public onCollisionEnter(other, self) {
		console.log("Currently colliding");
		cc.game.pause();
	}
}
