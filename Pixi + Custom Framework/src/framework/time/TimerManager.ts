import Timer from "./Timer";

export default class TimerManager {
  public static onAdded(timer: Timer): void {
    TimerManager._timers.push(timer);
  }

  public static onUpdate(): void {
    for (const timer of TimerManager._timers) {
      timer.update();
    }
  }

  public static onDestroy(timer: Timer): void {
    const index: number = TimerManager._timers.indexOf(timer);

    if (index !== -1) {
      TimerManager._timers.splice(index, 1);
    }
  }

  public static destroyAll(): void {
    for (const timer of TimerManager._timers) {
      TimerManager.onDestroy(timer);
    }
  }

  private static _timers: Timer[] = [];
}
