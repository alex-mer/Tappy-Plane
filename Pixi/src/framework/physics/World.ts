export default class World {
  private _planck: any = (window as any).planck;

  constructor() {
    const world = new this._planck.World();
    console.log(world);
  }

  public onUpdate() {
    //
  }
}
