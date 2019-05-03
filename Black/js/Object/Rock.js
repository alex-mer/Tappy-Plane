import { RigidBody, Sprite } from "black-engine";

export default class Rock extends Sprite {
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
        this._startPosition = 860;
        this._endPosition = -700;
        this._scorePosition = 0;
    }

    move() {
        if(this.x < this._endPosition) {
            this.toStart();
        }
        
        this.x -= this._speed;
    }

    toStart() {
        this.x = this._startPosition;
    }
}