const {ccclass, property} = cc._decorator;

import Main from "./Main";

@ccclass
export default class Ground extends cc.Component {
    @property(Main)
    main: Main = null;

    @property
    speed: number = 120;

    onLoad () {
	    cc.director.getCollisionManager().enabled = true;
    }

    public onUpdate (dt) {
        this.node.setPosition( this.node.position.x -= this.speed * dt, this.node.position.y);
        if( this.node.position.x < -650) {
            this.node.setPosition(650, this.node.position.y);
        }
    }

	public onCollisionEnter() {
        this.main.gameOver();
	}
}