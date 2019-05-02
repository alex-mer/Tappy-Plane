import MainScene from "../Scene/Game";

export const config: GameConfig = {
	scale: {
		mode: Phaser.Scale.FIT,
		width: 600,
		height: 900
	},
	type: Phaser.AUTO,
	parent: "game",
	scene: MainScene,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 500 }
		}
	}
};