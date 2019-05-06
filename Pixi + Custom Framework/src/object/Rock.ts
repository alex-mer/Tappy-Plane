import Sprite from "../framework/object/Sprite";
import StateBase from "../framework/state/StateBase";

export default class Rock extends Sprite {
  private _speed: number = 5;
  private _startPosition: number = 860;
  private _endPosition: number = -700;

  constructor(
    parent: StateBase,
    frame: string,
    group: string,
    x: number,
    y: number
  ) {
    super(frame, "atlas");

    this.x = x;
    this.y = y;

    this.scale.set(1.5);

    const phys = parent.app.physics;
    phys.addBody(this, { density: 10.0, position: phys.vec2(0.0, 0.0) });
    this.body.setStatic();

    this.addToStage(parent, group);
  }

  public move() {
    if (this.body.getPosition().x * 30 < this._endPosition) {
      this.toStart();
    } else {
      this.body.setPosition({
        x: (this.x - this._speed) / 30,
        y: this.body.getPosition().y
      });
    }
  }

  public toStart() {
    this.body.setPosition({
      x: this._startPosition / 30,
      y: this.body.getPosition().y
    });
  }
}
