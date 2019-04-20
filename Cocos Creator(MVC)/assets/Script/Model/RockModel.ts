const {ccclass, property} = cc._decorator;

@ccclass
export default class RockModel extends cc.Component {
    @property
    public speed: number = 240;

    @property
    public startPosition: number = 1100;

    @property
    public endPosition: number = -700;

    private _scorePosition: number = -200;
    private _active: boolean = true;

    public updatePosition(rock: any, dt: number): any {
        if(this._active && rock.position.x < this._scorePosition) {
            this._active = false;
            this.node.emit('update-score');
        }
        
        if(rock.position.x < this.endPosition) {
            this._active = true;

            return {x: this.startPosition, y: this._getRandomY()};
        }

        return {x: rock.position.x - (this.speed * dt), y: rock.position.y};
    }

    public toStart(): any {
        this._active = true;

        return {x: this.startPosition, y: this._getRandomY()};
    }

    private _getRandomY(): number {
        const maxY = 300;
        return (Math.random() * maxY) - maxY / 2;
    }
}