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

    this.addToStage(parent, group);
  }

  public move() {
    if (this.x < this._endPosition) {
      this.toStart();
    }

    this.x -= this._speed;
  }

  public toStart() {
    this.x = this._startPosition;
  }
}
