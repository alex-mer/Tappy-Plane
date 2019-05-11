export default class Engine {
    private static _nodeLists: any = {};

    private _systems: any[] = [];
  
    public static addComponent(component: any, parent: any): void {
        Engine._nodeLists[component] = parent.getComponentsInChildren(component);
    }
  
    public static removeComponent(component: any): void {
        Engine._nodeLists[component] = null;
    }

    public static getList(nodeClass: any): any {
        return Engine._nodeLists[nodeClass];
    }
  
    public addSystem(system: any): void {
        this._systems.push(system);
        system.start();
    }
  
    public removeSystem(system: any): void {
        system.end();
        
        const index: number = this._systems.indexOf(system);
        if (index !== -1) {
            this._systems.splice(index, 1);
        }
    }
  
    public onUpdate(dt: number): void {
        for(let system of this._systems) {
            if (system.onUpdate) {
                system.onUpdate(dt);
            }
        }
    }
}
