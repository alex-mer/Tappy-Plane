import { Howl, Howler } from "howler";

export default class SoundManager {
  private _sounds: any = {};

  public add(key: string, sound: Howl): void {
    this._sounds[key] = {
      name: key,
      snd: sound
    };
  }

  public play(key: string, volume: number = 1, loop: boolean = false): void {
    this._sounds[key].snd.loop(loop);
    this._sounds[key].snd.volume(volume);
    this._sounds[key].snd.play();
  }
}
