import Framework from "./framework/Framework";

import Game from "./states/Game";
import Preloader from "./states/Preloader";

export default class App {
  constructor() {
    setTimeout("window.scrollTo(0, 1)", 10);

    const app: Framework = Framework.getInstance("appContainer", {
      width: 600,
      height: 900,
      maxWidth: 720,
      maxHeight: 1300,
      physics: true
    });

    app.state.add("Preloader", Preloader);
    app.state.add("Game", Game);

    app.state.start("Preloader");
  }
}

new App();
