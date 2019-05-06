import Framework from "./../../framework/Framework";
import State from "./StateBase";

export default class StateManager {
  public currentState: State;
  private _app: Framework;

  private _states: any = {};
  private _key: string;

  constructor(app: Framework) {
    this._app = app;
  }

  public add(key: string, state: any, autoStart: boolean = false): void {
    this._states[key] = {
      name: key,
      obj: state
    };

    this._key = key;

    if (autoStart) {
      this.start(key);
    }
  }

  public start(key: string): void {
    this._key = key;

    this._destroy();

    this.currentState = new this._states[key].obj(this._app);
    this.currentState.onCreate();
  }

  public onUpdate(): void {
    if (this.currentState.onUpdate) {
      this.currentState.onUpdate();
    }
  }

  public restart(): void {
    this.start(this._key);
  }

  private _destroy(): void {
    if (this.currentState) {
      this.currentState.destroy();
    }

    this.currentState = null;
  }
}
