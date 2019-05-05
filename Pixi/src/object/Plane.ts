import StateBase from "../framework/state/StateBase";
import AnimatedSprite from "../framework/object/AnimatedSprite";

export default class Plane extends AnimatedSprite {
  private _speed: number = 5;
  private _startPosition: number = 860;
  private _endPosition: number = -700;

  constructor(parent: StateBase, group: string, x: number, y: number) {
    super([
      "Planes/planeBlue1.png",
      "Planes/planeBlue2.png",
      "Planes/planeBlue3.png"
    ]);

    this.x = x;
    this.y = y;

    this.loop = true;
    this.animationSpeed = 0.1;
    this.play();

    this.addToStage(parent, group);
  }

  public onTap(): void {
    console.log("tap");
  }
}
