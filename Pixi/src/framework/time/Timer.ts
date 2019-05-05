import TimerManager from "./TimerManager";

export default class Timer {
  private _time: number = 0;
  private _repeat: number = 0;

  private _active: boolean = false;

  private _endTime: number;

  private _callback: any;

  constructor(time: number = 1, callback: any) {
    this._endTime = time * 60;

    this._callback = callback;

    TimerManager.onAdded(this);
  }

  public update(): void {
    if (this._active) {
      this._time++;

      if (this._time >= this._endTime) {
        this._callback();

        if (this._repeat > 0) {
          this.reset();

          this._repeat--;
        } else {
          TimerManager.onDestroy(this);
        }
      }
    }
  }

  public repeat(totalRepeat: number): Timer {
    this._repeat = totalRepeat;

    return this;
  }

  public start(): Timer {
    this._active = true;

    return this;
  }

  public pause(): Timer {
    this._active = false;

    return this;
  }

  public resume(): Timer {
    this._active = true;

    return this;
  }

  public reset(): Timer {
    this._time = 0;

    return this;
  }

  public destroy(): void {
    TimerManager.onDestroy(this);
  }
}
