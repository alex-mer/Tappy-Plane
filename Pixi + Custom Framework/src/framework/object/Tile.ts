import * as PIXI from "pixi.js";

export default class Tile extends PIXI.extras.TilingSprite {
  constructor(
    frame: string,
    scale: number,
    width: number = 100,
    height: number = 100
  ) {
    const texture = PIXI.Texture.fromFrame(frame);

    super(texture);

    this.tileScale.x = scale;
    this.tileScale.y = scale;

    this.width = width;
    this.height = height;

    this.addStyle();
  }

  public addPosition(x: number = 0, y: number = 0): Tile {
    this.x = x;
    this.y = y;

    return this;
  }

  public addStyle(anchor: number = 0.5, scale: number = 1): Tile {
    this.anchor.set(anchor, anchor);
    this.scale.set(scale, scale);

    return this;
  }

  public addToStage(stage: any, group: any): Tile {
    this.displayGroup = group;
    if (group.zIndex >= 2) {
      stage.addChild(this);
    } else {
      stage.camera.addChild(this);
    }

    return this;
  }

  public onActive(down: any, up?: any): Tile {
    this.interactive = true;
    this.on("pointerdown", down);

    if (up) {
      this.on("pointerdown", up);
    }

    return this;
  }
}
