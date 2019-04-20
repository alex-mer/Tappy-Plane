const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraView extends cc.Component {
    public vibration(): void {
        this.getComponent(cc.Animation).play();
    }
}
