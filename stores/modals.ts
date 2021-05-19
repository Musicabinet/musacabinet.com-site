import { action, makeObservable, observable } from 'mobx';
import { MODALS } from '../constants';

export class ModalsStore {

  @observable list = {
    [MODALS.SIGN_IN]: false,
    [MODALS.SIGN_UP]: false,
    [MODALS.RECOVER_PASSWORD]: false,
    [MODALS.GRAND_CHART]: false,
    [MODALS.PREVIEW_NOTES]: false,
    [MODALS.PREVIEW_CHART]: false
  };

  constructor() {
    makeObservable(this);
  }

  @action.bound
  show(id_window: MODALS) {
    if (this.list.hasOwnProperty(id_window)) {
      this.list[id_window] = true;
    }
  }

  @action.bound
  close(id_window: MODALS) {
    if (this.list.hasOwnProperty(id_window)) {
      this.list[id_window] = false;
    }
  }

}
