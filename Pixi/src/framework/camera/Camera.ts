export default class Camera extends PIXI.Container {
  private _active: boolean;

  private _startX: number = 0;
  private _startY: number = 0;
  private _worldWidth: number;
  private _worldHeight: number;

  private _state: any;

  constructor(state: any) {
    super();

    this._state = state;
  }

  public setWorld(width: number, height: number): void {
    this._worldWidth = width;
    this._worldHeight = height;

    this._active = true;
  }

  public move(vx: number, vy: number): void {
    if (!this._active) return;

    if (this.x + vx >= -this._worldWidth && this.x + vx <= -this._startX) {
      this.x += vx;
    }

    if (this.y + vy >= -this._worldHeight && this.y + vy <= -this._startY) {
      this.y += vy;
    }
  }

  public follow(object: any): void {
    if (!this._active || object.displayGroup.zIndex !== 1) return;

    const center = object.getGlobalPosition();
    this.position.x -= center.x - window.innerWidth / 2;
    this.position.y -= center.y - window.innerHeight / 2;

    if (this.x > 0) {
      this.x = 0;
    }
    if (this.y > 0) {
      this.y = 0;
    }
    if (this.x < -(this._worldWidth - this._state.app.width)) {
      this.x = -(this._worldWidth - this._state.app.width);
    }
    if (this.y < -(this._worldHeight - this._state.app.height)) {
      this.y = -(this._worldHeight - this._state.app.height);
    }
  }
}
