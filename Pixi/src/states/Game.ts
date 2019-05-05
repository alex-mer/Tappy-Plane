import Tile from "../framework/object/Tile";
import AnimatedSprite from "./../framework/object/AnimatedSprite";
import Sprite from "./../framework/object/Sprite";
import StateBase from "./../framework/state/StateBase";

export default class Game extends StateBase {
  private _enemy: AnimatedSprite;

  public onCreate(): void {
    new Tile("bg.png", 1, 720, 1300)
      .addPosition(300, this.centerY)
      .addToStage(this, this.backgroundGroup);

    const anim = [
      "enemyRed1.png",
      "enemyRed2.png",
      "enemyRed3.png",
      "enemyRed4.png",
      "enemyRed5.png",
      "enemyBlack1.png",
      "enemyBlack2.png",
      "enemyBlack3.png",
      "enemyBlack4.png",
      "enemyBlack5.png",
      "enemyBlue1.png",
      "enemyBlue2.png",
      "enemyBlue3.png",
      "enemyBlue4.png",
      "enemyBlue5.png",
      "enemyGreen1.png",
      "enemyGreen2.png",
      "enemyGreen3.png",
      "enemyGreen4.png",
      "enemyGreen5.png"
    ];
    this._enemy = new AnimatedSprite(anim)
      .addPosition(this.centerX, this.centerY)
      .addToStage(this, this.foregroundGroup);
    this._enemy.loop = true;
    this._enemy.animationSpeed = 0.25;
    this._enemy.play();

    this.camera.setWorld(100, 100);
    this.camera.move(-1000, 0);
  }
}
