import "pixi-display";
import * as PIXI from "pixi.js";

import Camera from "./../../framework/camera/Camera";
import Framework from "./../../framework/Framework";

export default class StateBase extends PIXI.Container {
  protected app: Framework;

  protected camera: Camera;

  protected backgroundGroup: any;
  protected foregroundGroup: any;
  protected uiGroup: any;
  protected popupGroup: any;

  protected bounds: any;
  protected centerX: number;
  protected centerY: number;

  constructor(app: Framework) {
    super();

    this.app = app;

    this.interactive = true;
    this.app.pixi.stage.addChild(this);

    this.centerX = this.app.width / 2;
    this.centerY = this.app.height / 2;

    this.camera = new Camera(this);
    this.addChild(this.camera);

    this._addDisplayList();
    if (this.app.scaleMode !== "NO_SCALE") {
      this._setPosition();
      this._createBounds();
    }
  }

  public onCreate(): void {
    // Empty
  }

  public onUpdate(): void {
    // Empty
  }

  private _addDisplayList(): void {
    this.app.pixi.stage.displayList = new PIXI.DisplayList();

    this.backgroundGroup = new PIXI.DisplayGroup(0, false);
    this.foregroundGroup = new PIXI.DisplayGroup(1, false);
    this.uiGroup = new PIXI.DisplayGroup(2, false);
    this.popupGroup = new PIXI.DisplayGroup(3, false);
  }

  private _createBounds(): void {
    this.bounds = {
      bottom: this.app.height + this.y,
      left: -this.x,
      right: this.app.width + this.x,
      top: -this.y
    };

    if (this.bounds.bottom > this.app.maxHeight)
      this.bounds.bottom = this.app.maxHeight - this.y / 2;
    if (this.bounds.right > this.app.maxWidth)
      this.bounds.right = this.app.maxWidth - this.x / 2;
    if (this.bounds.left < this.centerX - this.app.maxWidth / 2)
      this.bounds.left = this.centerX - this.app.maxWidth / 2;
    if (this.bounds.top < this.centerY - this.app.maxHeight / 2)
      this.bounds.top = this.centerY - this.app.maxHeight / 2;
  }

  private _setPosition(): void {
    this.x = window.innerWidth / 2 / this.app.scale - this.app.width * 0.5;
    this.y = window.innerHeight / 2 / this.app.scale - this.app.height * 0.5;
  }
}
