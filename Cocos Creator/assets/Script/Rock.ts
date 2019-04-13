const {ccclass, property} = cc._decorator;

import Main from "./Main";

@ccclass
export default class Ground extends cc.Component {
    @property(Main)
    main: Main = null;

    @property
    speed: number = 120;

    private _startX: number = 0;
    private _startY: number = 0;
    private _active: boolean =  true;

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        
        this._startX = this.node.position.x;
        this._startY = this.node.position.y;
    }

    public onUpdate (dt) {
        this.node.setPosition(this.node.position.x -= this.speed * dt, this.node.position.y);
        if(this.node.position.x < -650) {
            this.node.setPosition(1100, this._startY);
            this._active = true;
        }
        
        if(this._active && this.node.position.x < -90) {
            this.main.updateScore();
            this._active = false;
        }
    }

	public onCollisionEnter() {
        this.main.gameOver();
    }
    
    public toStart(): void {
        this.node.setPosition(this._startX, this._startY);
        this._active = true;
    }
}