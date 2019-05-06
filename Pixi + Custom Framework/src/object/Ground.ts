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

    const phys = parent.app.physics;
    phys.addBody(this, { density: 10.0, position: phys.vec2(0.0, 0.0) });
    this.body.setStatic();

    this.addToStage(parent, group);
  }

  public move() {
    if (this.body.getPosition().x * 30 <= -(this.width + this._gap)) {
      this.body.setPosition({
        x: (2 * this.width + this.x) / 30,
        y: this.body.getPosition().y
      });
    } else {
      this.body.setPosition({
        x: (this.x - this._speed) / 30,
        y: this.body.getPosition().y
      });
    }
  }
}
