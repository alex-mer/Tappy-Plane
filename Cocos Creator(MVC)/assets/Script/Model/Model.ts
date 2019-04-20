import PlaneModel from "./PlaneModel";
import GroundModel from "./GroundModel";
import RockModel from "./RockModel";
import ScoreModel from "./ScoreModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Model extends cc.Component {
    @property(PlaneModel)
    public plane: PlaneModel = null;

    @property(GroundModel)
    public ground: GroundModel = null;

    @property(RockModel)
    public rock: RockModel = null;

    @property(ScoreModel)
    public score: ScoreModel = null;

    private _state: string = 'start';

    public get state(): string {
        return this._state;
    }

    public set state(value: string) {
        this._state = value;
    }
}
