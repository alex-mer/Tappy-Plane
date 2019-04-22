import GroundModel from "../Model/GroundModel";
import GroundView from "../View/GroundView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GroundController {
    private _model: GroundModel;
    private _view: GroundView[];

    public constructor(model: GroundModel, view: GroundView[]) {
        this._model = model;
        this._view = view;
    }

    public update(dt: number): void {
        for (let i = 0; i < this._view.length; i++) {
            this._view[i].setX( this._model.updatePosition(this._view[i].node, dt) );
        }
    }
}