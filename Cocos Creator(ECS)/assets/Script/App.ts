import Engine from "./Engine";

import MovementSystem from "./System/MovementSystem";
import ToStartSystem from "./System/ToStartSystem";
import ApplyForceSystem from "./System/ApplyForceSystem";
import CollisionSystem from "./System/CollisionSystem";
import Gamemanager from "./System/GameManager";

import VelocityComponent from "./Component/VelocityComponent";
import ToStartComponent from "./Component/ToStartComponent";
import ApplyForceComponent from "./Component/ApplyForceComponent";
import CollisionComponent from "./Component/CollisionComponent";
import GameComponent from "./Component/GameComponent";

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
