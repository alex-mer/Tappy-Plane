export default class Rock {
    public physics: any;

	private _rockTop: Phaser.GameObjects.Image;
    private _rockBottom: Phaser.GameObjects.Image;
    private _rocks: Phaser.GameObjects.Image[] = [];
    private _game: Phaser.Scene;

    private _speed: number = 5;
    private _startPosition: number;
    private _endPosition: number = -700;
    private _scorePosition: number = 0;
    private _active: boolean = true;

    public create(game: Phaser.Scene): void {
        this._game = game;

        this._startPosition = this._game.scale.x + 560;
        this._scorePosition = this._game.scale.x;

        this._rockTop = this._game.add.image(this._game.scale.x + 560, this._game.scale.y - 350, 'atlas', 'rockDown.png');
        this._rockBottom = this._game.add.image(this._game.scale.x + 560, this._game.scale.y + 350, 'atlas', 'rockGrass.png');

        this.physics = this._game.physics.add.group({ allowGravity: false });
        this.physics.add(this._rockTop);
        this.physics.add(this._rockBottom);

        this._rockTop.setScale(2);
        this._rockBottom.setScale(2);

        this._rocks.push(this._rockTop);
        this._rocks.push(this._rockBottom);
    }

    public update(dt: number): any {
        for (const element of this._rocks) {
            if(this._active && element.x < this._scorePosition) {
                this._active = false;
                
                this._game.events.emit('updateScore');
            }
            
            if(element.x < this._endPosition) {
                this.toStart();
                break;
            }

            element.x -= this._speed;
        }
    }

    public toStart(): void {
        for (const element of this._rocks) {
            this._active = true;

            element.x = this._startPosition;
        }
    }
}