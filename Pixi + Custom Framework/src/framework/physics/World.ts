export default class World {
  public world: any;
  public vec2: any;
  public circle: any;
  public box: any;

  private _planck: any = (window as any).planck;
  private _pscale: number = 30;
  private _group: any[];
  private _app: any;

  constructor(app: any) {
    this._app = app;

    this.vec2 = this._planck.Vec2;
    this.circle = this._planck.Circle;
    this.box = this._planck.Box;
    this.world = this._planck.World(this.vec2(0, 50), true);
  }

  public onUpdate() {
    this._group = this._app.state.currentState.children[0].children;
    this.world.step(1 / 60, this._app.pixi.ticker.elapsedMS / 1000);

    for (const obj of this._group) {
      if (obj.body) {
        const pos = obj.body.getPosition();
        obj.position.set(this._mpx(pos.x), this._mpx(pos.y));
      }
    }
  }

  public collide(callback: Function, context: any) {
    this.world.on("begin-contact", callback.bind(context));
  }

  public addBody(obj: any, fixtureDef: any): void {
    const body = this.world.createBody().setDynamic();
    body.setPosition(this.vec2(this._pxm(obj.x), this._pxm(obj.y)));
    body.createFixture(
      this.box(this._pxm(obj.width) / 2, this._pxm(obj.height) / 2),
      fixtureDef
    );
    obj.body = body;
  }

  private _mpx(m: number): number {
    return m * this._pscale;
  }

  private _pxm(p: number): number {
    return p / this._pscale;
  }
}
