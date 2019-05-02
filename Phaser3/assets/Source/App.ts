import "phaser";
import { config } from "./Config/GameConfig";

export class App extends Phaser.Game {
	constructor(config: GameConfig) {
		super(config);
		
		window.addEventListener('resize', this._resize.bind(this));
		if (this.isBooted)
			this._resize();
		else
			this.events.once('boot', this._resize);

		this._updateScaleManager();
	}

	private _resize(): void {
		const scale = Math.min(window.innerWidth / 600, window.innerHeight / 900);
		const width = window.innerWidth / scale;
		const height = window.innerHeight / scale;
		
		this.canvas.setAttribute('style',
			' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
			' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' +
			' transform-origin: top left;'
		);
		this.scale.resize(width, height);
		this.scene.scenes.forEach(function (scene) {
			scene.cameras.main.setViewport(0, 0, width, height);
		});
	}

	private _updateScaleManager(): void {
		this.scale.x = this.scale.gameSize.width / 2;
		this.scale.y = this.scale.gameSize.height / 2;
	}
}

window.addEventListener("load", () => {
	const game = new App(config);
});