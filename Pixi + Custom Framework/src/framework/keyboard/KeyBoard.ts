export default class KeyBoard {
  public code: number;
  public isDown: boolean = false;
  public isUp: boolean = true;
  public press: any;
  public release: any;

  private _downHandlerBind: any = this._downHandler.bind(this);
  private _upHandlerBind: any = this._upHandler.bind(this);

  constructor(keyCode: number) {
    this.code = keyCode;

    window.addEventListener("keydown", this._downHandlerBind, false);
    window.addEventListener("keyup", this._upHandlerBind, false);
  }

  public destroy(): void {
    window.removeEventListener("keydown", this._downHandlerBind, false);
    window.removeEventListener("keyup", this._upHandlerBind, false);
  }

  private _downHandler(event: any): void {
    if (event.keyCode === this.code) {
      if (this.isUp && this.press) {
        this.press();
      }

      this.isDown = true;
      this.isUp = false;
    }

    event.preventDefault();
  }

  private _upHandler(event: any): void {
    if (event.keyCode === this.code) {
      if (this.isDown && this.release) {
        this.release();
      }

      this.isDown = false;
      this.isUp = true;
    }

    event.preventDefault();
  }
}
