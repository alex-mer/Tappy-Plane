import * as PIXI from "pixi.js";

export default class Graphics extends PIXI.Sprite {
  constructor(texture?: any) {
    if (texture) {
      super(texture);

      this.addStyle();
    }
  }
  public addRect(
    width: number,
    height: number,
    color: string = "white",
    clearRect?: any
  ): Graphics {
    const mask = this._makeCanvas(width, height);
    const ctx = mask.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    if (clearRect)
      ctx.clearRect(
        clearRect.x,
        clearRect.y,
        clearRect.width,
        clearRect.height
      );
    ctx.closePath();

    const sprite = this._makeSprite(mask);

    return sprite;
  }

  public addCircle(
    radius: number,
    color: string = "white",
    clearRadius: number = 0
  ): Graphics {
    const width = radius * 2;
    const height = radius * 2;
    const mask = this._makeCanvas(width, height);
    const ctx = mask.getContext("2d");

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, clearRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.globalCompositeOperation = "xor";
    ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2, false);
    ctx.fill();

    const sprite = this._makeSprite(mask);

    return sprite;
  }

  public addPosition(x: number = 0, y: number = 0): Graphics {
    this.x = x;
    this.y = y;

    return this;
  }

  public addToStage(stage: any, group: any): Graphics {
    this.displayGroup = group;
    if (group.zIndex >= 2) {
      stage.addChild(this);
    } else {
      stage.camera.addChild(this);
    }

    return this;
  }

  public addStyle(anchor: number = 0.5, scale: number = 1): Graphics {
    this.anchor.set(anchor, anchor);
    this.scale.set(scale, scale);

    return this;
  }

  public onActive(down: any, over?: any, up?: any, out?: any): Graphics {
    this.interactive = true;
    this.on("pointerdown", down);

    if (over) {
      this.on("pointerover", over);
    }

    if (up) {
      this.on("pointerup", up);
    }

    if (out) {
      this.on("pointerout", out);
    }

    return this;
  }

  private _makeCanvas(width: number, height: number): any {
    const mask = document.createElement("canvas");
    mask.width = width;
    mask.height = height;

    return mask;
  }

  private _makeSprite(mask: any): Graphics {
    const texture: PIXI.Texture = PIXI.Texture.fromCanvas(mask);
    const sprite = new Graphics(texture);

    return sprite;
  }
}
