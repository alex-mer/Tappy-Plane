import AnimatedSprite from "./../framework/object/AnimatedSprite";
import Sprite from "./../framework/object/Sprite";
import Text from "./../framework/object/Text";
import StateBase from "./../framework/state/StateBase";

export default class Game extends StateBase {
  private _tapAnim: AnimatedSprite;
  private _explosion: AnimatedSprite;
  private _getReady: Sprite;
  private _tapRight: Sprite;
  private _tapLeft: Sprite;

  private _topScoreLable: Text;
  private _currentScore: Text;

  public onCreate(): void {
    new Sprite("background.png", "atlas")
      .addPosition(this.centerX, this.centerY)
      .addToStage(this, this.backgroundGroup)
      .addStyle(0.5, 2);

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
      .addToStage(this, this.foregroundGroup);
    this._tapAnim.loop = true;
    this._tapAnim.animationSpeed = 0.05;
    this._tapAnim.play();

    this._addExplosion();
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
}
