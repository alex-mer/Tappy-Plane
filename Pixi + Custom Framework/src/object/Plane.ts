import StateBase from "../framework/state/StateBase";
import AnimatedSprite from "../framework/object/AnimatedSprite";

export default class Plane extends AnimatedSprite {
  private _parent: StateBase;
  private _speed: number = 5;
  private _startPosition: number = 860;
  private _endPosition: number = -700;

  constructor(parent: StateBase, group: string, x: number, y: number) {
    super([
      "Planes/planeBlue1.png",
      "Planes/planeBlue2.png",
      "Planes/planeBlue3.png"
    ]);

    this._parent = parent;

    this.x = x;
    this.y = y;

    this.loop = true;
    this.animationSpeed = 0.1;
    this.play();

    const phys = this._parent.app.physics;
    phys.addBody(this, { density: 10.0, position: phys.vec2(0.0, 0.0) });

    this.addToStage(parent, group);
  }

  public onTap(): void {
    this.body.setLinearVelocity({ x: 0, y: 0 });
    this.body.applyLinearImpulse(
      this._parent.app.physics.vec2(0, -1500),
      this.body.getWorldCenter()
    );
  }
}
