export default class ObjectPool {
  private _queue: any = [];
  private _object: any;
  private _maxObject: number;

  constructor(object: any, maxObject: number = 100) {
    this._object = object;
    this._maxObject = maxObject;
  }

  public add(object: any): void {
    if (this._queue.length < this._maxObject) {
      this._queue.push(object);
    }
  }

  public removeAll(): void {
    this._queue.length = 0;
  }

  public get maxObject(): number {
    return this._maxObject;
  }

  public set maxObject(maxObject: number) {
    this._maxObject = maxObject;
  }

  public get(): any {
    return this._queue.length > 0 ? this._queue.pop() : new this._object();
  }
}
