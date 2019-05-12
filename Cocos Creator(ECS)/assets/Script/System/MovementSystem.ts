import Engine from "./../Engine";
import VelocityComponent from "./../Component/VelocityComponent";
import GameComponent from "./../Component/GameComponent";

export default class MovementSystem {
    private _targets: VelocityComponent[] = null;
    private _game: GameComponent = null;

    public start(): void {
        this._targets = Engine.getList(VelocityComponent);
        this._game = Engine.getList(GameComponent)[0];
    }

    public onUpdate(dt: number): void {
        if(this._game.state !== 'game') return;

        for (const target of this._targets) {
            target.node.x += target.velocityX * dt;
            target.node.y += target.velocityY * dt;
            target.node.angle += target.angle * dt;
        }
    }
}
