import PlaneView from "./PlaneView";
import StartScreenView from "./StartScreenView";
import ScoreView from "./ScoreView";
import CameraView from "./CameraView";
import ExplosionView from "./ExplosionView";
import RockView from "./RockView";
import GroundView from "./GroundView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class View extends cc.Component {
    @property(StartScreenView)
    public startScreen: StartScreenView = null;

    @property(PlaneView)
    public plane: PlaneView = null;

    @property(ScoreView)
    public score: ScoreView = null;

    @property(CameraView)
    public camera: CameraView = null;

    @property(ExplosionView)
    public explosion: ExplosionView = null;

    @property(RockView)
    public rock: RockView = null;

    @property(GroundView)
    public groundTop1: GroundView = null;

    @property(GroundView)
    public groundTop2: GroundView = null;

    @property(GroundView)
    public groundBottom1: GroundView = null;

    @property(GroundView)
    public groundBottom2: GroundView = null;
}
