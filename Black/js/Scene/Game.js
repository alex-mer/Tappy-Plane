import { Black, AssetManager, MasterAudio, GameObject, Arcade, Tween, Timer } from '../../node_modules/black-engine';
import Plane from '../Object/Plane';
import Utils from '../Utils/Utils';
import Ground from '../Object/Ground';
import Rock from '../Object/Rock';

export default class Game extends GameObject {
	constructor() {
		super();

		const assets = AssetManager.default;
		assets.defaultPath = '/assets/';
		assets.enqueueAtlas('atlas', 'atlas.png', 'atlas.json');
		assets.enqueueFont('kenvector', 'kenvector_future_thin.ttf');
		assets.enqueueSound('music', 'music.m4a', 'music.ogg');
		assets.enqueueSound('crash', 'crash.m4a', 'crash.ogg');
		assets.enqueueSound('tap', 'tap.m4a', 'tap.ogg');
		assets.on('complete', this.onAssetsLoadded, this);
		assets.loadQueue();
	}

	onAssetsLoadded() {
		this.state = 'start';
		this.score = 0;
		this.topScore = 0;

		this.arcade = Black.instance.getSystem(Arcade);
		this.arcade.gravityY = 500;
		this.stage.x = -500;
		
		Utils.addImage(this, 'background', null, null, 2);
		this._blackout = Utils.addGraphics(this, -40, -30, 680, 960, 0.3);

		this._plane = new Plane(this);

		this.grounds = [];
		this._groundBottom1 = new Ground(this, 'groundGrass', 310, 878);
		this._groundBottom2 = new Ground(this, 'groundGrass', 1520, 878);
		this._groundTop1 = new Ground(this, 'groundGrass', 310, 0, Math.PI);
		this._groundTop2 = new Ground(this, 'groundGrass', 1520, 0, Math.PI);

		this._rockTop = new Rock(this, 'rockDown', 860, 125);
		this._rockBottom = new Rock(this, 'rockGrass', 860, 755);

		this.grounds.push(this._groundBottom1, this._groundBottom2, this._groundTop1, this._groundTop2, this._rockTop, this._rockBottom);
		
		this.addExplosion();

		this._getReady = Utils.addImage(this, 'UI/textGetReady', null, 230);
		this._tapRight = Utils.addImage(this, 'UI/tapRight', 390, 585);
		this._tapLeft = Utils.addImage(this, 'UI/tapLeft', 210, 585);
		this._tapAnim = Utils.addAnimation(this, 'UI/tap_*', 300, 585, 'tap', 2, 1, true);
		
		this._topScoreLable = Utils.addText(this, 'Top Score: 0', 300, 100, 'kenvector', 0xffffff, 30, 0x000000, 3);
		this._currentScore = Utils.addText(this, '0', 300, 100, 'kenvector', 0xffffff, 90, 0x000000, 3);
		this._currentScore.alpha = 0;

		this.addBlackout();

		MasterAudio.play('music', 'master', 0.5, true);
		
		this.stage.on('pointerDown', this.startGame, this);
	}

	onUpdate() {
		if(this.state === 'game') {
			this._groundBottom1.move();
			this._groundBottom2.move();
			this._groundTop1.move();
			this._groundTop2.move();
			this._rockTop.move();
			this._rockBottom.move();

			this.grounds.forEach( (ground) => {
				this.arcade.isColliding(ground.body, this._plane.body, this.endGame, this);
			})
			
			if(this._rockTop.x.toFixed() == 300) {
				this.updateScore();
			}
		}
	}

	startGame() {
		this.stage.off('pointerDown');
		this.stage.on('pointerDown', this._plane.onTap, this._plane);
		this._plane.body.isStatic = false;
		this._plane.body.velocityY = 0;
		
		this.state = 'game';
		this.score = 0;
		this._currentScore.text = this.score.toString();

		this._blackout.visible = false;
		this.animation([this._getReady, this._tapRight, this._tapLeft, this._tapAnim, this._topScoreLable], { alpha: 0 });
		this.animation([this._currentScore], { alpha: 1 });

		MasterAudio.play('tap', 'master', 5);
	}

	endGame() {
		this.state = 'end';
		this.stage.off('pointerDown');

		//this.cameras.main.shake(500, 0.05);

		this.explosion.visible = true;
		this.explosion.anim.play('explosion');
		this.explosion.x = this._plane.x;
		this.explosion.y = this._plane.y;
		
		this._plane.alpha = 0;
		this._plane.x = 300;
		this._plane.y = 400;

		MasterAudio.play('crash', 'master', 1);

		this.timer = this.addComponent(new Timer(0.5));
		this.timer.on('tick', this.restart, this);
	}

	restart() {
		this._blackout.visible = true;
		this.explosion.visible = false;
		this._plane.body.isStatic = true;
		this.animation([this._plane, this._getReady, this._tapRight, this._tapLeft, this._tapAnim, this._topScoreLable],  { alpha: 1 });
		this.animation([this._currentScore], { alpha: 0 });
		
        this._topScoreLable.text = 'Top Score: ' + this.topScore.toString();

		this._rockTop.toStart();
		this._rockBottom.toStart();

        this.stage.on('pointerDown', this.startGame, this);
	}

	addExplosion() {
		this.explosion = Utils.addAnimation(this, 'Explosion/explosion_*', 300, 585, 'explosion', 10, 2, false);
		this.explosion.visible = false;
	}

	animation(images, obj) {
		for (const iterator of images) {
			const tween = new Tween(obj, 0.5);
			iterator.addComponent(tween);
		}
	}

    updateScore() {
		this.score++;
		this._currentScore.text = this.score.toString();

        if(this.score > this.topScore) {
            this.topScore = this.score;
        }
	}

	addBlackout() {
		Utils.addGraphics(this, -740, 0, 700, 960);
		Utils.addGraphics(this, 640, 0, 700, 960);
	}
}