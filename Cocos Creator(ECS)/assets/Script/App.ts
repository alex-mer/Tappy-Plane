import Engine from "./Engine";

import MovementSystem from "./MovementSystem";
import ToStartSystem from "./ToStartSystem";
import ApplyForceSystem from "./ApplyForceSystem";
import CollisionSystem from "./CollisionSystem";
import Gamemanager from "./GameManager";

import VelocityComponent from "./VelocityComponent";
import ToStartComponent from "./ToStartComponent";
import ApplyForceComponent from "./ApplyForceComponent";
import CollisionComponent from "./CollisionComponent";
import GameComponent from "./GameComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class App extends cc.Component {
    private _engine: Engine;

    public onLoad (): void {
	    cc.director.getCollisionManager().enabled = true;
    }

    public start(): void {
        this._engine = new Engine();

        Engine.addComponent(VelocityComponent, this);
        Engine.addComponent(ToStartComponent, this);
        Engine.addComponent(ApplyForceComponent, this);
        Engine.addComponent(CollisionComponent, this);
        Engine.addComponent(GameComponent, this);

        this._engine.addSystem(new MovementSystem());
        this._engine.addSystem(new ToStartSystem());
        this._engine.addSystem(new ApplyForceSystem());
        this._engine.addSystem(new CollisionSystem());
        this._engine.addSystem(new Gamemanager());
    }

    public update(dt: number): void {
        this._engine.onUpdate(dt);
    }
}
