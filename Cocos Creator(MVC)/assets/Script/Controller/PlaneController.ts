import PlaneModel from "../Model/PlaneModel";
import PlaneView from "../View/PlaneView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlaneController {
    public model: PlaneModel;
    public view: PlaneView;

    public constructor(model: PlaneModel, view: PlaneView) {
        this.model = model;
        this.view = view;
    }

    public update(dt: number): void {
        this.view.setAngle( this.model.updateRotation(this.view.node) );
        this.view.setY( this.model.updatePosition(this.view.node) );
    }

    public startGame(): void {
        this.view.playAnimation();
        this.view.playSound();
    }

    public restart(): void {
        this.model.stopPlaneActions(this.view.node);
        this.view.restart();
    }

    public gameOver(): void {
        this.view.hide();
    }

    public onTap(): void {
        this.model.onTap(this.view.node);
    }
}