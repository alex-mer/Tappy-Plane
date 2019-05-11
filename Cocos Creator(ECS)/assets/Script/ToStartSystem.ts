import Engine from "./Engine";
import ToStartComponent from "./ToStartComponent";
import GameComponent from "./GameComponent";

export default class ToStartSystem {
    private _targets: ToStartComponent[] = null;
    private _game: GameComponent = null;

    public start(): void {
        this._game = Engine.getList(GameComponent)[0];

        this._targets = Engine.getList(ToStartComponent);
    }

    public onUpdate(dt: number): void {
        for (const target of this._targets) {
            if(target.node.x < target.endX || (this._game.state === 'end' && target.restartGameOver)) {
                target.node.x = target.startX;
            }
        }
    }
}
