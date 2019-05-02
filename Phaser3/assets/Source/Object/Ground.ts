export default class Ground {
    public groundsPhysics: any;

	private _groundTop1: Phaser.GameObjects.Image;
	private _groundTop2: Phaser.GameObjects.Image;
	private _groundBottom1: Phaser.GameObjects.Image;
    private _groundBottom2: Phaser.GameObjects.Image;
    
    private _grounds: Phaser.GameObjects.Image[] = [];
    private _game: Phaser.Scene;

    private _gap: number = -200;
    private _speed: number = 5;
    
	public create(game: Phaser.Scene): void {
        this._game = game;

        this._groundBottom1 = this._game.add.image(this._game.scale.x + 10, this._game.scale.y + 428, 'atlas', 'groundGrass.png');
        this._groundBottom2 = this._game.add.image(this._game.scale.x + 1220, this._game.scale.y + 428, 'atlas', 'groundGrass.png');
        this._groundTop1 = this._game.add.image(this._game.scale.x + 10, this._game.scale.y - 428, 'atlas', 'groundDirt.png');
        this._groundTop2 = this._game.add.image(this._game.scale.x + 1220, this._game.scale.y - 428, 'atlas', 'groundDirt.png');

        this.groundsPhysics = this._game.physics.add.group({ allowGravity: false, immovable: true });
        this.groundsPhysics.add(this._groundBottom1);
        this.groundsPhysics.add(this._groundBottom2);
        this.groundsPhysics.add(this._groundTop1);
        this.groundsPhysics.add(this._groundTop2);

        this._groundBottom1.setScale(1.5);
        this._groundBottom2.setScale(1.5);
        this._groundTop1.setScale(1.5);
        this._groundTop2.setScale(1.5);
        this._groundTop1.angle = 180;
        this._groundTop2.angle = 180;

        this._grounds.push(this._groundBottom1);
        this._grounds.push(this._groundBottom2);
        this._grounds.push(this._groundTop1);
        this._grounds.push(this._groundTop2);
	}

	public update(dt: number): void {
        for (const element of this._grounds) {
            if (element.x <= -(element.displayWidth + this._gap)) {
                element.x = 2 * element.displayWidth + element.x;
            }
            
            element.x -= this._speed;
        }
	}
}