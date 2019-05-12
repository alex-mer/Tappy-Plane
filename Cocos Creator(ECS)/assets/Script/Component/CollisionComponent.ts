const {ccclass, property} = cc._decorator;

@ccclass
export default class CollisionComponent extends cc.Component {
    public onCollisionEnter: Function;
}
