class LocalStorageClass {
  get(key: string) {
    let result = localStorage.getItem(key);

    if (result !== null) {
      return JSON.parse(result);
    } else {
      return null;
    }
  }

  set(key: string, data: any) {
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
  }

  getJSON(key: string) {
    let result = localStorage.getItem(key);

    if (result !== null) {
      return result;
    } else {
      return {};
    }
  }
}

export const LocalStorage = new LocalStorageClass();
