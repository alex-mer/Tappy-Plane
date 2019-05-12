import Engine from "./../Engine";
import CollisionComponent from "./../Component/CollisionComponent";
import GameComponent from "./../Component/GameComponent";

export default class CollisionSystem {
    private _targets: CollisionComponent[] = null;
    private _game: GameComponent = null;

    public start(): void {
        this._game = Engine.getList(GameComponent)[0];

        this._targets = Engine.getList(CollisionComponent);
        for (const target of this._targets) {
            target.onCollisionEnter = () => {
                this.onCollisionEnter(target);
            };
        }
    }

    public onCollisionEnter(target: CollisionComponent): void {
        this._game.state = 'end';

        //this._vibration();

        target.getComponent(cc.Animation).stop();
        target.node.active = false;
        /*this.explosion.getComponent(cc.Animation).play();
        this.explosion.active = true;
        this.explosion.x = this.plane.node.x;
        this.explosion.y = this.plane.node.y;

        this.explosion.getComponent(cc.AudioSource).play();*/

        target.scheduleOnce(function() {
            this._restart(target);
        }.bind(this), 0.5);
    }

    private _restart(target: CollisionComponent): void {
        target.node.stopAllActions();
        target.node.x = 0;
        target.node.y = 0;
        target.node.angle = 0;
        target.node.active = true;

        this._game.state = 'start';

        /*this.explosion.active = false;

        this.startScreen.active = true;
        this.scoreLabel.active = false;
        this.topScoreLabel.getComponent(cc.Label).string = 'Top Score ' + this.topScore;*/
    }
}