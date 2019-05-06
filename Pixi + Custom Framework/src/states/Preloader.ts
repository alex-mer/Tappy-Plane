import Text from "./../framework/object/Text";
import StateBase from "./../framework/state/StateBase";

export default class Preloader extends StateBase {
  public onCreate(): void {
    const loading = new Text("0", "kenvector")
      .addStyle(13)
      .addPosition(this.centerX, this.centerY)
      .addToStage(this, this.foregroundGroup);
    loading.style.align = "center";

    this.app.load.sprite(["static/img/atlas.json"]);
    this.app.load.audio("crash", [
      "static/audio/crash.ogg",
      "static/audio/crash.mp4"
    ]);
    this.app.load.audio("music", [
      "static/audio/music.ogg",
      "static/audio/music.mp4"
    ]);
    this.app.load.audio("tap", [
      "static/audio/tap.ogg",
      "static/audio/tap.mp4"
    ]);
    this.app.load.onLoad((progress: number) => {
      loading.text = progress + "%";
    });
    this.app.load.onComplete(this._startApp.bind(this));
  }

  private _startApp(): void {
    this.app.state.start("Game");
  }
}
