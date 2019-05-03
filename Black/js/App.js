import { Black, CanvasDriver, MasterAudio, StageScaleMode, Arcade, Input } from 'black-engine';
import Game from './Scene/Game';

const black = new Black('container', Game, CanvasDriver, [Arcade, Input, MasterAudio]);

black.pauseOnBlur = false;
black.pauseOnHide = false;
black.start();

black.stage.setSize(600, 900);
black.stage.scaleMode = StageScaleMode.LETTERBOX;