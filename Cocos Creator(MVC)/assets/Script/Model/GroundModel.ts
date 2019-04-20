const {ccclass, property} = cc._decorator;

@ccclass
export default class GroundModel extends cc.Component {
    @property
    public speed: number = 240;

    @property
    public gap: number = 50;

    public updatePosition(ground: any, dt: number): number {
        if (ground.position.x <= -(ground.width + this.gap)) {
            return 2 * ground.width + ground.position.x;
        }
        
        return ground.position.x - (this.speed * dt);
    }
}