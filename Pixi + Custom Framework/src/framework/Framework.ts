import * as TWEEN from "@tweenjs/tween.js";
import * as PIXI from "pixi.js";

import Loader from "./loader/Loader";
import World from "./physics/World";
import SoundManager from "./sound/SoundManager";
import StateManager from "./state/StateManager";
import TimerManager from "./time/TimerManager";
import Device from "./utils/Device";
import LocalStorage from "./utils/LocalStorage";

export default class Framework {
  public static getInstance(container: string, config: any): Framework {
    if (!Framework._instance) {
      Framework._instance = new Framework(container, config);
    }

    return Framework._instance;
  }

  private static _instance: Framework;

  public readonly pixi: PIXI.Application;

  public readonly state: StateManager;
  public readonly sound: SoundManager;
  public readonly storage: LocalStorage;
  public readonly load: Loader;
  public physics: World;

  public readonly scaleMode: string;

  public readonly width: number;
  public readonly height: number;
  public readonly maxWidth: number;
  public readonly maxHeight: number;
  public scale: number;

  private constructor(container: string, config: any) {
    const width =
      config.scaleMode === "NO_SCALE" ? config.width : window.innerWidth;
    const height =
      config.scaleMode === "NO_SCALE" ? config.height : window.innerHeight;

    this.width = config.width;
    this.height = config.height;
    this.maxWidth = config.maxWidth || this.width;
    this.maxHeight = config.maxHeight || this.height;

    this.pixi = new PIXI.Application(width, height, {
      backgroundColor: config.color
    });
    document.getElementById(container).appendChild(this.pixi.view);

    this.scaleMode = config.scaleMode || "SCALE";
    if (this.scaleMode === "SCALE") {
      this._scale();
    }

    this.state = new StateManager(this);
    this.sound = new SoundManager();
    this.storage = new LocalStorage();
    this.load = new Loader(this);

    if (config.physics) {
      this.load.js(
        "https://cdn.jsdelivr.net/npm/planck-js@0.2.6/dist/planck.min.js",
        () => {
          this.physics = new World(this);
        }
      );
    }

    new Device();

    this.pixi.ticker.add(this._update.bind(this));
  }

  private _update(): void {
    TWEEN.update();

    TimerManager.onUpdate();

    if (this.physics) {
      this.physics.onUpdate();
    }

    this.state.onUpdate();
  }

  private _scale(): void {
    const scaleX = window.innerWidth / this.width;
    const scaleY = window.innerHeight / this.height;
    this.scale = Math.min(scaleX, scaleY);
    this.pixi.stage.scale.set(this.scale);
  }
}
