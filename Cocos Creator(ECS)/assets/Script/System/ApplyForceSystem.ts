import Engine from "./../Engine";
import ApplyForceComponent from "./../Component/ApplyForceComponent";
import GameComponent from "./../Component/GameComponent";

export default class ApplyForceSystem {
    private _targets: ApplyForceComponent[] = null;
    private _game: GameComponent = null;

    public start(): void {
        this._targets = Engine.getList(ApplyForceComponent);
        this._game = Engine.getList(GameComponent)[0];

        for (const target of this._targets) {
            this._game.node.on(cc.Node.EventType.TOUCH_START, () => {
                this._onTap(target);
            });
        }
    }

    private _onTap(target: ApplyForceComponent): void {
        if(this._game.state !== 'game') return;
        
	    const rotation = cc.rotateTo(0.3, 25).easing(cc.easeCubicActionOut());
        const up = cc.moveBy(target.jumpDuration, cc.v2(0, target.jumpHeight)).easing(cc.easeCubicActionOut());

        target.node.runAction(rotation);
        target.node.runAction(up);

        target.getComponent(cc.AudioSource).play();
    }
}