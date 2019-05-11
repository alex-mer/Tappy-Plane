const {ccclass, property} = cc._decorator;

@ccclass
export default class VelocityComponent extends cc.Component {
    @property
    public velocityX: number = 100;

    @property
    public velocityY: number = 100;

    @property
    public angle: number = 0;
}
