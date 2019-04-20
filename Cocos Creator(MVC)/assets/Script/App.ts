import Model from "./Model/Model";
import View from "./View/View";
import Controller from "./Controller/Controller";

const {ccclass, property} = cc._decorator;

@ccclass
export default class App extends cc.Component {
    private _model: Model = null;
    private _view: View = null;
    private _controller: Controller = null;

    public onLoad(): void {
        cc.director.getCollisionManager().enabled = true;
    }

    public start(): void {
        this._model = this.getComponent(Model);
        this._view = this.getComponent(View);
        this._controller = new Controller(this._model, this._view);
    }

    public update(dt): void {
        this._controller.update(dt);
    }
}
