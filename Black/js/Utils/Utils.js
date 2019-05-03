import { AssetManager, Sprite, Graphics, TextField, AnimationController } from "black-engine";

export default class Utils {
    static addImage(scene, name, x, y, scale) {
		const sprite = new Sprite(name);
		sprite.x = x || scene.stage.centerX;
		sprite.y = y || scene.stage.centerY;
		sprite.scale = scale || 1;
		sprite.alignPivot();
		scene.addChild(sprite);
		
		return sprite;
    }

	static addGraphics(scene, x, y, w, h, alpha) {
		let graphic = new Graphics();
		graphic.beginPath();
		graphic.rect(x, y, w, h);
		graphic.alpha = alpha || 1;
		graphic.fill();
		scene.add(graphic);
        
		return graphic;
    }
    
	static addText(scene, text, x, y, font, color, fontSize, strokeColor, strokeThickness) {
		let textField = new TextField(text, font, color, fontSize);
		textField.x = x;
		textField.y = y;
		textField.strokeThickness = strokeThickness;
		textField.strokeColor = strokeColor;
		textField.alignPivot();
		scene.addChild(textField);
        
		return textField;
    }
    
	static addAnimation(scene, texture, x, y, name, speed, scale, loop) {
		const sprite = new Sprite();
		sprite.x = x || scene.stage.centerX;
		sprite.y = y || scene.stage.centerY;
		sprite.scale = scale || 1;

		let textureAnim = AssetManager.default.getTextures(texture);
		scene.anim = sprite.addComponent(new AnimationController());
		scene.anim.add(name, textureAnim, speed, loop);
		scene.anim.play(name);

		sprite.anim = scene.anim;
        
		sprite.alignPivot();
		scene.addChild(sprite);
		
		return sprite;
	}
}