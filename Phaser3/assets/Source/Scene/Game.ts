import Ground from "../Object/Ground";
import Rock from "../Object/Rock";
import Plane from "../Object/Plane";

export default class Game extends Phaser.Scene {
	private _ground: Ground;
	private _rock: Rock;
	private _plane: Plane;

	private _getReady: Phaser.GameObjects.Image;
	private _tapRight: Phaser.GameObjects.Image;
	private _tapLeft: Phaser.GameObjects.Image;
	private _tapAnim: Phaser.GameObjects.Image;
	private _explosion: Phaser.GameObjects.Sprite;
	private _blackout: Phaser.GameObjects.Rectangle;
	private _topScoreLable: Phaser.GameObjects.Text;
	private _currentScore: Phaser.GameObjects.Text;

	private _state: string = 'start';
	private _topScore: number = 0;
	private _score: number = 0;

	constructor() {
		super({key: "Game"});
	}

	public preload(): void {
		this.load.audio('crash', ['assets/Audio/crash.ogg', 'assets/Audio/crash.mp4']);
		this.load.audio('music', ['assets/Audio/music.ogg', 'assets/Audio/music.mp4']);
		this.load.audio('tap', ['assets/Audio/tap.ogg', 'assets/Audio/tap.mp4']);

		this.load.atlas('atlas', './assets/Texture/Atlas/atlas.png', './assets/Texture/Atlas/atlas.json');
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	}

	public create(): void {
		WebFont.load({
			custom: {
				families: ['kenvector']
			}
		});

		this.add.image(this.scale.x, this.scale.y, 'atlas', 'background.png').setScale(2);
		
		this._ground = new Ground();
		this._ground.create(this);

		this._rock = new Rock();
		this._rock.create(this);

		const color = new Phaser.Display.Color(0, 0, 0);
		this._blackout = this.add.rectangle(this.scale.x, this.scale.y, 680, 960, color.color).setAlpha(0.3);

		const planeAnim = [{key: "atlas", frame: "Planes/planeBlue1.png"}, 
							{key: "atlas", frame: "Planes/planeBlue2.png"}, {key: "atlas", frame: "Planes/planeBlue3.png"}];
		this.anims.create({ key: 'plane', frames: planeAnim, repeat: -1, frameRate: 10});
		this._plane = new Plane(this, this.scale.x, this.scale.y, 'atlas', 'Planes/planeBlue1.png');
		this._plane.play('plane');
		this.physics.world.enable([this._plane]);
		this._plane.body.allowGravity = false;
		this._plane.body.setCollideWorldBounds(true);
		this.add.existing(this._plane);

		this._getReady = this.add.image(this.scale.x, this.scale.y - 215, 'atlas', 'UI/textGetReady.png');
		this._tapRight = this.add.image(this.scale.x - 90, this.scale.y + 135, 'atlas', 'UI/tapRight.png');
		this._tapLeft = this.add.image(this.scale.x + 90, this.scale.y + 135, 'atlas', 'UI/tapLeft.png');

		const tapAnim = [{key: "atlas", frame: "UI/tap.png"}, {key: "atlas", frame: "UI/tapTick.png"}];
		this.anims.create({ key: 'tap', frames: tapAnim, repeat: -1, frameRate: 3});
		this._tapAnim = this._tapAnim = this.add.sprite(this.scale.x, this.scale.y + 135, 'atlas').play('tap');

		this._addExplosion();
		this._addBlackout();

		this.sound.add('music', { loop: true, volume: 0.5 }).play();

		this.events.on('updateScore', this._updateScore, this);
		
		this.physics.add.overlap(this._plane, this._ground.groundsPhysics, this._gameOver, null ,this);
		this.physics.add.overlap(this._plane, this._rock.physics, this._gameOver, null ,this);

		this.input.on('pointerdown', this._startGame, this);
		this.input.on('pointerdown', this._playSfxTap, this);
		
		setTimeout( () => {
			this._topScoreLable = this.add.text(this.scale.x - 100, this.scale.y - 406, 'Top Score: 0', { fontFamily: 'kenvector', fontSize: 30, color: '#ffffff' });
			this._topScoreLable.setStroke('#000000', 3);
	
			this._currentScore = this.add.text(this.scale.x - 10, this.scale.y - 400, '0', { fontFamily: 'kenvector', fontSize: 60, color: '#ffffff' });
			this._currentScore.setStroke('#000000', 3);
			this._currentScore.alpha = 0;
		}, 100)
	}

	public update(dt: number): void {
		if(this._state === 'game') {
			this._ground.update(dt);
			this._rock.update(dt);
			this._plane.update(dt);
		}
	}

	private _startGame(): void {
		this.input.off('pointerdown', this._startGame);
		this.input.on('pointerdown', this._plane.onTap, this._plane);

		this._state = 'game';
		this._score = 0;
		this._currentScore.text = this._score.toString();
		
		this._plane.body.allowGravity = true;
		this._plane.body.enable = true;
		this._plane.body.setVelocityY(0);

		this._blackout.visible = false;
		this._hideAnim([this._getReady, this._tapRight, this._tapLeft, this._tapAnim, this._topScoreLable]);
		this._showAnim([this._currentScore]);
	}

    private _gameOver(): void {
        this._state = 'end';
		
		this.cameras.main.shake(500, 0.05);

		this.input.off('pointerdown', this._plane.onTap, this._plane);

		this._explosion.visible = true;
		this._explosion.setPosition(this._plane.x, this._plane.y);
		this._explosion.play('explosion');

		this._plane.body.enable = false;
		this._plane.alpha = 0;
		this._plane.x = this.scale.x;
		this._plane.y = this.scale.y;

		this.sound.add('crash').play();
		
		this.time.addEvent({ delay: 500, callback: this._restart, callbackScope: this});
	}
	
    private _restart(): void {
		this._blackout.visible = true;
		this._explosion.visible = false;
		this._showAnim([this._plane, this._getReady, this._tapRight, this._tapLeft, this._tapAnim, this._topScoreLable]);
		this._hideAnim([this._currentScore]);

        this._topScoreLable.text = 'Top Score: ' + this._topScore.toString();

        this._rock.toStart();

        this.input.on('pointerdown', this._startGame, this);
	}
	
    private _updateScore(): void {
		this._score++;
		this._currentScore.text = this._score.toString();

        if(this._score > this._topScore) {
            this._topScore = this._score;
        }
	}
	
	private _addExplosion(): void {
		const explosionAnim = [
			{key: "atlas", frame: "Explosion/explosion_1.png"}, {key: "atlas", frame: "Explosion/explosion_2.png"}, 
			{key: "atlas", frame: "Explosion/explosion_3.png"}, {key: "atlas", frame: "Explosion/explosion_4.png"},
			{key: "atlas", frame: "Explosion/explosion_5.png"}, {key: "atlas", frame: "Explosion/explosion_6.png"},
			{key: "atlas", frame: "Explosion/explosion_7.png"}, {key: "atlas", frame: "Explosion/explosion_8.png"},
			{key: "atlas", frame: "Explosion/explosion_9.png"}];
		this.anims.create({ key: 'explosion', frames: explosionAnim, frameRate: 30});

		this._explosion = this.add.sprite(this.scale.x, this.scale.y, 'atlas', 'Explosion/explosion_1.png').setScale(2);
		this._explosion.visible = false;
	}

	private _showAnim(images): void {
		for (const iterator of images) {
			this.tweens.add({targets: iterator, alpha: 1, ease: 'Power1', duration: 500});
		}
	}

	private _hideAnim(images): void {
		for (const iterator of images) {
			this.tweens.add({targets: iterator, alpha: 0, ease: 'Power1', duration: 250});
		}
	}

	private _playSfxTap(): void {
		this.sound.add('tap', {volume: 3}).play();
	}

	private _addBlackout(): void {
		const color = new Phaser.Display.Color(0, 0, 0);
	
		this.add.rectangle(this.scale.x - 690, this.scale.y, 700, 960, color.color);
		this.add.rectangle(this.scale.x + 690, this.scale.y, 700, 960, color.color);
	}
}
