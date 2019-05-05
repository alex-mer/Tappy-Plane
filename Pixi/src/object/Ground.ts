import Sprite from "../framework/object/Sprite";
import StateBase from "../framework/state/StateBase";

export default class Ground extends Sprite {
  private _speed: number = 5;
  private _gap: number = -200;

  constructor(
    parent: StateBase,
    group: string,
    x: number,
    y: number,
    rotation: number = 0
  ) {
    super("groundGrass.png", "atlas");

    this.x = x;
    this.y = y;

    this.scale.set(1.5);
    this.rotation = rotation;

    this.addToStage(parent, group);
  }

  public move() {
    if (this.x <= -(this.width + this._gap)) {
      this.x = 2 * this.width + this.x;
    }

    this.x -= this._speed;
  }
}
