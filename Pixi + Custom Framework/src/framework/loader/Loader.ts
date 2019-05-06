import { Howl, Howler } from "howler";
import Framework from "./../../framework/Framework";

export default class Loader {
  private _app: Framework;

  private _json: any = {};
  private _completeCallback: any;
  private _loadCallback: any;
  private _spriteLoaded: boolean = true;
  private _jsonLoaded: boolean = true;
  private _jsLoaded: boolean = true;
  private _soundLoaded: boolean = true;
  private _soundLoad: number = 0;
  private _soundTotal: number = 0;

  constructor(app: Framework) {
    this._app = app;
  }

  public sprite(sprites: string[]): void {
    this._spriteLoaded = false;
    PIXI.loader
      .add(sprites)
      .on("progress", loader => {
        if (this._loadCallback) {
          this._loadCallback(loader.progress);
        }
      })
      .load(() => {
        this._spriteLoaded = true;
        this._loaded();
      });
  }

  public audio(key: string, audios: string[]): void {
    this._soundLoaded = false;
    this._soundTotal++;

    const sound: Howl = new Howl({ src: audios });
    sound.once("load", () => {
      this._soundLoad++;

      if (this._soundLoad === this._soundTotal) {
        this._soundLoad = 0;
        this._soundTotal = 0;

        this._soundLoaded = true;
        this._loaded();
      }
    });

    this._app.sound.add(key, sound);
  }

  public js(url: string, callback?: any): void {
    this._jsLoaded = false;

    const script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);

    script.onload = () => {
      this._jsLoaded = true;
      this._loaded();

      if (callback) {
        callback();
      }
    };
  }

  public json(key: string, url: string): void {
    this._jsonLoaded = false;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        console.log("error: " + xhr.statusText);
        return;
      }

      const text: string = JSON.parse(xhr.responseText);

      this._json[key] = {
        name: key,
        responseText: text
      };

      this._jsonLoaded = true;
      this._loaded();
    };
  }

  public getJson(key: string): void {
    return this._json[key].responseText;
  }

  public onLoad(callback: any): void {
    this._loadCallback = callback;
  }

  public onComplete(callback: any): void {
    this._completeCallback = callback;
  }

  private _loaded(): void {
    if (
      this._completeCallback &&
      this._spriteLoaded &&
      this._jsonLoaded &&
      this._soundLoaded &&
      this._jsLoaded
    ) {
      this._completeCallback();
    }
  }
}
