import RockModel from "../Model/RockModel";
import RockView from "../View/RockView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RockController {
    public model: RockModel;
    public view: RockView;

    public constructor(model: RockModel, view: RockView) {
        this.model = model;
        this.view = view;
    }

    public update(dt: number): void {
        this.view.setPosition( this.model.updatePosition(this.view.node, dt) );
    }

    public restart(): void {
        this.view.setPosition( this.model.toStart() );
    }
}