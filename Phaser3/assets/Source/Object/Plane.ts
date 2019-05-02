export default class Plane extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, atlas, texture) {
        super(scene, x, y, atlas, texture);
    }

    public onTap(): void {
        this.body.setVelocityY(-300);
    }
}
