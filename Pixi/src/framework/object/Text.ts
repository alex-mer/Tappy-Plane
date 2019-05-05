import * as PIXI from "pixi.js";

export default class Text extends PIXI.Text {
  constructor(txt: string, font: string = "Arial") {
    super(txt);

    this.style.fontFamily = font;

    this.addStyle();
  }

  public addPosition(x: number = 0, y: number = 0): Text {
    this.x = x;
    this.y = y;

    return this;
  }

  public addStyle(
    size: number = 15,
    anchor: number = 0.5,
    fill: string = "#ffffff"
  ): Text {
    this.style.fontSize = size;
    this.style.fill = fill;
    this.anchor.set(anchor, anchor);

    return this;
  }

  public addOutline(thickness: number, color: string): Text {
    this.style.strokeThickness = thickness;
    this.style.stroke = color;

    return this;
  }

  public addToStage(stage: any, group: any): Text {
    this.displayGroup = group;
    if (group.zIndex >= 2) {
      stage.addChild(this);
    } else {
      stage.camera.addChild(this);
    }

    return this;
  }

  public onActive(down: any, up?: any): Text {
    this.interactive = true;
    this.on("pointerdown", down);

    if (up) {
      this.on("pointerdown", up);
    }

    return this;
  }
}
