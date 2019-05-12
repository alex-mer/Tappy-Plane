import Engine from "./../Engine";
import GameComponent from "./../Component/GameComponent";

export default class GameManager {
    private _game: GameComponent = null;

    public start(): void {
        this._game = Engine.getList(GameComponent)[0];

        this._game.node.on(cc.Node.EventType.TOUCH_START, this._startGame, this);
    }

    private _startGame(): void {
        if(this._game.state === 'start') {
            this._game.state = 'game';
        }
    }
}