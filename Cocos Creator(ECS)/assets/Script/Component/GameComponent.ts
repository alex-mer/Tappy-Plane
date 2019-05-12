const {ccclass, property} = cc._decorator;

@ccclass
export default class GameComponent extends cc.Component {
    @property
    public state: string = 'start';

    @property
    public topScore: number = 0;

    @property
    public score: number = 0;
}