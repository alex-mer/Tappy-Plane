import { AssetManager, AnimationController, MasterAudio, RigidBody, Sprite } from "black-engine";

export default class Plane extends Sprite {
	constructor(scene) {
        super();
        
        this.x = 300;
        this.y = 450;

		let textureAnim = AssetManager.default.getTextures('Planes/planeBlue*');
		scene.anim = this.addComponent(new AnimationController());
		scene.anim.add('plane', textureAnim, 10);
        scene.anim.play('plane');
        
        this.body = this.addComponent(new RigidBody());
        this.body.isStatic = true;
        
		this.alignPivot();
        scene.add(this);
    }

    onTap() {
        this.body.forceY = -25000;

        MasterAudio.play('tap', 'master', 5);
    }
}