import { action, makeObservable, observable } from 'mobx';
import { Cookie } from '../core';
import { RootStore } from './index';

let rootStore: RootStore;

export class WebsocketStore {
  @observable connection: null | WebSocket = null;
  @observable connect: boolean = false;

  constructor(root: RootStore) {
    makeObservable(this);
    rootStore = root;
  }

  @action.bound
  async init() {
    try {
      return new Promise((resolve) => {
        if (this.connect) {
          console.log(`Exist connection.`);
          resolve(`Exist connection.`);
        }

        // Подключаемся к WS
        this.connection = new WebSocket(`${WEBSOCKET_URL}`);

        // Открываем соединение
        this.connection.onopen = () => {
          console.log(`[OPEN] Success connection.`);
          this.connect = true;
          resolve(`[OPEN] Success connection.`);
        };

        // Закрываем соедеинение
        this.connection.onclose = (e) => {
          if (e.wasClean) {
            console.log(`[CLOSE] Connection success close, code=${e.code} reason=${e.reason}.`);
          } else {
            console.log('[ERROR CLOSE] Disconnect.');
          }
        };
      });
    } catch (e) {
      console.error(`Error in method WebsocketStore.init : `, e);
    }
  }

  @action.bound
  async disconnect() {
    try {
      if (this.connection instanceof WebSocket) {
        this.connection.close();
        this.connect = false;
        this.connection = null;
      }
    } catch (e) {
      console.error(`Error in method disconnect : `, e);
    }
  }

  @action.bound
  callbackOnMessage(callback: (data: {}) => void) {
    try {
      if (this.connection) {
        this.connection.onmessage = (e) => {
          callback(JSON.parse(e.data));
        };
      } else {
        console.warn(`Error in method callbackOnMessage Connection = NULL`);
      }
    } catch (e) {
      console.error(`Error in method callbackOnMessage : `);
    }
  }

  sendMessage = (data: {}) => {
    try {
      if (this.connection) {
        const cookie = Cookie.getInstance();

        let defaultData = {
          token: cookie.get('token'),
          id: rootStore.userStore.id
        };
        this.connection.send(JSON.stringify({ ...data, ...defaultData }));
      } else {
        console.warn(`Error in method sendMessage Connection = NULL`);
      }
    } catch (e) {
      console.error(`Error in method sendMessage : `, e);
    }
  };
}
