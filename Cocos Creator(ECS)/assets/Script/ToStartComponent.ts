const {ccclass, property} = cc._decorator;

@ccclass
export default class ToStartComponent extends cc.Component {
    @property
    public startX: number = 100;

    @property
    public endX: number = -100;

    @property
    public restartGameOver: boolean = false;
}
