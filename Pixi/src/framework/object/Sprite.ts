import * as PIXI from "pixi.js";

export default class Sprite extends PIXI.Sprite {
  constructor(
    frame: string,
    atlas: string = "none",
    path: string = "static/img/"
  ) {
    let texture: PIXI.Texture;

    if (atlas === "none") {
      texture = PIXI.utils.TextureCache[path + frame];
    } else {
      texture = PIXI.utils.TextureCache[frame];
    }

    super(texture);

    this.addStyle();
  }

  public addPosition(x: number = 0, y: number = 0): Sprite {
    this.x = x;
    this.y = y;

    return this;
  }

  public addStyle(anchor: number = 0.5, scale: number = 1): Sprite {
    this.anchor.set(anchor, anchor);
    this.scale.set(scale, scale);

    return this;
  }

  public addToStage(stage: any, group?: any): Sprite {
    if (group) {
      this.displayGroup = group;
      if (group.zIndex >= 2) {
        stage.addChild(this);
      } else {
        stage.camera.addChild(this);
      }
    } else {
      stage.addChild(this);
    }

    return this;
  }

  public onActive(down: any, over?: any, up?: any, out?: any): Sprite {
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
}
