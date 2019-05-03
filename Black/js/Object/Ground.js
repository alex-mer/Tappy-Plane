import { RigidBody, Sprite } from "black-engine";

export default class Ground extends Sprite {
	constructor(scene, name, x, y, rotation) {
        super(name);
        
        this.x = x;
        this.y = y;

        this.scale = 1.5;
        this.rotation = rotation || 0;
        
        this.body = this.addComponent(new RigidBody());
        this.body.isStatic = true;
        
		this.alignPivot();
        scene.add(this);

        this._speed = 5;
        this._gap = -200;
    }

    move() {
        if (this.x <= -(this.width + this._gap)) {
            this.x = 2 * this.width + this.x;
        }
        
        this.x -= this._speed;
    }
}