const {ccclass, property} = cc._decorator;

@ccclass
export default class ApplyForceComponent extends cc.Component {
    @property
    public jumpHeight: number = 40;

    @property
    public jumpDuration: number = 0.3;

    @property
    public gravity: number = 2;

    @property
    public rotation: number = 1;
}