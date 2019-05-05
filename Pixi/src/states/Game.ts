import AnimatedSprite from "./../framework/object/AnimatedSprite";
import Sprite from "./../framework/object/Sprite";
import Text from "./../framework/object/Text";
import StateBase from "./../framework/state/StateBase";
import Graphics from "../framework/object/Graphics";
import Ground from "../object/Ground";
import Rock from "../object/Rock";
import Plane from "../object/Plane";

import * as TWEEN from "@tweenjs/tween.js";

export default class Game extends StateBase {
  private _groundBottom1: Ground;
  private _groundBottom2: Ground;
  private _groundTop1: Ground;
  private _groundTop2: Ground;

  private _rockTop: Rock;
  private _rockBottom: Rock;

  private _plane: Plane;

  private _tapAnim: AnimatedSprite;
  private _explosion: AnimatedSprite;
  private _getReady: Sprite;
  private _tapRight: Sprite;
  private _tapLeft: Sprite;

  private _blackout: Graphics;

  private _topScoreLable: Text;
  private _currentScore: Text;

  private _state: string = "start";
  private _score: number = 0;
  private _topScore: number = 0;

  public onCreate(): void {
    new Sprite("background.png", "atlas")
      .addPosition(this.centerX, this.centerY)
      .addToStage(this, this.backgroundGroup)
      .addStyle(0.5, 2);

    this._groundBottom1 = new Ground(
      this,
      this.foregroundGroup,
      this.centerX,
      this.centerY + 428
    );
    this._groundBottom2 = new Ground(
      this,
      this.foregroundGroup,
      this.centerX + 1210,
      this.centerY + 428
    );
    this._groundTop1 = new Ground(
      this,
      this.foregroundGroup,
      this.centerX,
      this.centerY - 428,
      Math.PI
    );
    this._groundTop2 = new Ground(
      this,
      this.foregroundGroup,
      this.centerX + 1210,
      this.centerY - 428,
      Math.PI
    );

    this._rockTop = new Rock(
      this,
      "rockDown.png",
      this.foregroundGroup,
      this.centerX + 560,
      this.centerY - 325
    );
    this._rockBottom = new Rock(
      this,
      "rockGrass.png",
      this.foregroundGroup,
      this.centerX + 560,
      this.centerY + 325
    );

    this._blackout = new Graphics()
      .addRect(680, 960, "#000000")
      .addPosition(this.centerX, this.centerY)
      .addToStage(this, this.foregroundGroup);
    this._blackout.alpha = 0.3;

    this._plane = new Plane(
      this,
      this.foregroundGroup,
      this.centerX,
      this.centerY
    );

    this._getReady = new Sprite("UI/textGetReady.png", "atlas")
      .addPosition(this.centerX, this.centerY - 230)
      .addToStage(this, this.uiGroup);
    this._tapRight = new Sprite("UI/tapRight.png", "atlas")
      .addPosition(this.centerX + 90, this.centerY + 135)
      .addToStage(this, this.uiGroup);
    this._tapLeft = new Sprite("UI/tapLeft.png", "atlas")
      .addPosition(this.centerX - 90, this.centerY + 135)
      .addToStage(this, this.uiGroup);

    this._topScoreLable = new Text("Top Score: 0", "kenvector")
      .addPosition(this.centerX, this.centerY - 350)
      .addStyle(40)
      .addOutline(3, "#000000")
      .addToStage(this, this.uiGroup);

    this._currentScore = new Text("0", "kenvector")
      .addPosition(this.centerX, this.centerY - 350)
      .addStyle(90)
      .addOutline(3, "#000000")
      .addToStage(this, this.uiGroup);
    this._currentScore.alpha = 0;

    const anim = ["UI/tap.png", "UI/tapTick.png"];
    this._tapAnim = new AnimatedSprite(anim)
      .addPosition(this.centerX, this.centerY + 135)
      .addToStage(this, this.uiGroup);
    this._tapAnim.loop = true;
    this._tapAnim.animationSpeed = 0.05;
    this._tapAnim.play();

    this._addExplosion();
    this._addBlackout();

    //MasterAudio.play('music', 'master', 0.5, true);

    this.on("pointerdown", this._startGame, this);
  }

  public onUpdate(): void {
    if (this._state === "game") {
      this._groundBottom1.move();
      this._groundBottom2.move();
      this._groundTop1.move();
      this._groundTop2.move();
      this._rockTop.move();
      this._rockBottom.move();

      if (this._rockTop.x.toFixed() === "300") {
        this._updateScore();
      }
    }
  }

  private _startGame(): void {
    this.off("pointerdown", this._startGame, this);
    this.on("pointerDown", this._plane.onTap, this._plane);
    //this._plane.body.isStatic = false;
    //this._plane.body.velocityY = 0;

    this._state = "game";
    this._score = 0;
    this._currentScore.text = this._score.toString();

    this._blackout.visible = false;
    this._animation(
      [
        this._getReady,
        this._tapRight,
        this._tapLeft,
        this._tapAnim,
        this._topScoreLable
      ],
      { alpha: 0 }
    );
    this._animation([this._currentScore], { alpha: 1 });

    //MasterAudio.play('tap', 'master', 5);
  }

  /*endGame() {
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
	}*/

  private _updateScore() {
    this._score++;
    this._currentScore.text = this._score.toString();

    if (this._score > this._topScore) {
      this._topScore = this._score;
    }
  }

  private _animation(images: any[], obj: any) {
    for (const iterator of images) {
      new TWEEN.Tween(iterator)
        .to(obj, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    }
  }

  private _addExplosion(): void {
    const anim = [
      "Explosion/explosion_1.png",
      "Explosion/explosion_2.png",
      "Explosion/explosion_3.png",
      "Explosion/explosion_4.png",
      "Explosion/explosion_5.png",
      "Explosion/explosion_6.png",
      "Explosion/explosion_7.png",
      "Explosion/explosion_8.png",
      "Explosion/explosion_9.png"
    ];
    this._explosion = new AnimatedSprite(anim)
      .addPosition(this.centerX, this.centerY)
      .addToStage(this, this.foregroundGroup);
    this._explosion.animationSpeed = 0.05;
    this._explosion.visible = false;
  }

  private _playSfxTap(): void {
    //azazazaza
  }

  private _addBlackout(): void {
    new Graphics()
      .addRect(700, 960, "#000000")
      .addPosition(this.centerX - 690, this.centerY)
      .addToStage(this, this.uiGroup);
    new Graphics()
      .addRect(700, 960, "#000000")
      .addPosition(this.centerX + 690, this.centerY)
      .addToStage(this, this.uiGroup);
  }
}
