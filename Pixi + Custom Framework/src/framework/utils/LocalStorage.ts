export default class LocalStorage {
  public isCapable(): boolean {
    return !(typeof window.localStorage === "undefined");
  }

  public getAccess(key: string): any {
    if (!this.isCapable()) {
      return null;
    }

    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return window.localStorage.getItem(key);
    }
  }

  public setAccess(key: string, value: any): void {
    if (!this.isCapable()) {
      return null;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item < value || item == null)
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e === "QUOTA_EXCEEDED_ERR") {
        console.log("localStorage quota exceeded");
      }
    }
  }

  public setAnyAccess(key: string, value: any): void {
    if (!this.isCapable()) {
      return null;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e === "QUOTA_EXCEEDED_ERR") {
        console.log("localStorage quota exceeded");
      }
    }
  }

  public initUnset(key: string, value: any): void {
    if (this.getAccess(key) === null) {
      this.setAnyAccess(key, value);
    }
  }

  public clear(): void {
    if (!this.isCapable()) {
      return null;
    }

    window.localStorage.clear();
  }
}
