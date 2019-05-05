import { Howl, Howler } from "howler";

export default class SoundManager {
  private _sounds: any = {};

  public add(key: string, sound: Howl): void {
    this._sounds[key] = {
      name: key,
      snd: sound
    };
  }

  public play(key: string): void {
    this._sounds[key].snd.play();
  }
}
