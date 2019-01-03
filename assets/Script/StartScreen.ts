const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScreen extends cc.Component {

    private isVisible: boolean = true;

	public onLoad(): void {
		this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onTap, this);
	}

	private onTap(): void {
	    this.isVisible = false;
	}

	public getVisibled():boolean {
		return this.isVisible;
	}
	private keyDown(e:cc.Event.EventMouse): void{
		console.log('Mouse down');
	}

}
