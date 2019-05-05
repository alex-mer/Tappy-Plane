export default class Device {
  public static os: string;
  public static browser: string;

  constructor() {
    this._checkOS();
    this._checkBrowser();
  }

  public _checkOS(): void {
    const ua = window.navigator.userAgent;

    if (/Android/.test(ua)) {
      Device.os = "android";
    } else if (/iP[ao]d|iPhone/i.test(ua)) {
      Device.os = "iOS";
    } else if (/Linux/.test(ua)) {
      Device.os = "linux";
    } else if (/Mac OS/.test(ua)) {
      Device.os = "macOS";
    } else if (/Windows/.test(ua)) {
      Device.os = "windows";
    }
  }

  private _checkBrowser(): void {
    const ua = window.navigator.userAgent;

    if (/Edge\/\d+/.test(ua)) {
      Device.browser = "edge";
    } else if (/Chrome\/(\d+)/.test(ua)) {
      Device.browser = "chrome";
    } else if (/Firefox\D+(\d+)/.test(ua)) {
      Device.browser = "firefox";
    } else if (/AppleWebKit/.test(ua)) {
      Device.browser = "safari";
    } else if (/MSIE (\d+\.\d+);/.test(ua)) {
      Device.browser = "ie";
    } else if (/Opera/.test(ua)) {
      Device.browser = "opera";
    }
  }
}
