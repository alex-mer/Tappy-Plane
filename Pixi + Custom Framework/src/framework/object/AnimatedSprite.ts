import * as PIXI from "pixi.js";

export default class AnimatedSprite extends PIXI.extras.AnimatedSprite {
  public body: any;
  constructor(arrName: string[]) {
    const arrTexture: PIXI.Texture[] = [];
    for (const name of arrName) {
      const texture = PIXI.Texture.fromFrame(name);
      arrTexture.push(texture);
    }

    super(arrTexture);

    this.loop = false;
    this.animationSpeed = 0.5;

    this.addStyle();
  }

  public addPosition(x: number = 0, y: number = 0): AnimatedSprite {
    this.x = x;
    this.y = y;

    return this;
  }

  public addStyle(anchor: number = 0.5, scale: number = 1): AnimatedSprite {
    this.anchor.set(anchor, anchor);
    this.scale.set(scale, scale);

    return this;
  }

  public addToStage(stage: any, group: any): AnimatedSprite {
    this.displayGroup = group;
    if (group.zIndex >= 2) {
      stage.addChild(this);
    } else {
      stage.camera.addChild(this);
    }

    return this;
  }

  public onActive(down: any, up?: any): AnimatedSprite {
    this.interactive = true;
    this.on("pointerdown", down);

    if (up) {
      this.on("pointerdown", up);
    }

    return this;
  }

  public repeat(counter: number, deley: number = 0) {
    //
  }
}
