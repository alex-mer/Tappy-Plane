import Text from "./../framework/object/Text";
import StateBase from "./../framework/state/StateBase";

export default class Preloader extends StateBase {
  public onCreate(): void {
    const loading = new Text("0")
      .addStyle(13)
      .addPosition(this.centerX, this.centerY)
      .addToStage(this, this.foregroundGroup);
    loading.style.align = "center";

    this.app.load.sprite(["static/img/atlas.json"]);
    this.app.load.onLoad((progress: number) => {
      loading.text = progress + "%";
    });
    this.app.load.onComplete(this._startApp.bind(this));
  }

  private _startApp(): void {
    this.app.state.start("Game");
  }
}
