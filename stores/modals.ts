import { action, makeObservable, observable } from 'mobx';
import { MODALS, MODALS_GRAND_CHART } from '../constants';

export class ModalsStore {
  @observable list = {
    [MODALS.SIGN_IN]: false,
    [MODALS.SIGN_UP]: false,
    [MODALS.RECOVER_PASSWORD]: false,
    [MODALS.GRAND_CHART]: false,
    [MODALS.PREVIEW_NOTES]: false,
    [MODALS.PREVIEW_CHART]: false,

    [MODALS.CIRCLE_OF_FIFTHS]: false,
    [MODALS.FRETBOARD_A_B_C]: false,
    [MODALS.FRETBOARD_DO]: false,

    [MODALS_GRAND_CHART.SCHOOL_GUITAR]: false,
    [MODALS_GRAND_CHART.SCHOOL_KEYBOARD]: false,
    [MODALS_GRAND_CHART.SCHOOL_SAXOPHONE]: false,
    [MODALS_GRAND_CHART.COLLEGE_GUITAR]: false,
    [MODALS_GRAND_CHART.COLLEGE_KEYBOARD]: false,
    [MODALS_GRAND_CHART.COLLEGE_SAXOPHONE]: false,
    [MODALS_GRAND_CHART.UNIVERSITY_GUITAR]: false,
    [MODALS_GRAND_CHART.UNIVERSITY_KEYBOARD]: false,
    [MODALS_GRAND_CHART.UNIVERSITY_SAXOPHONE]: false,
  };

  constructor() {
    makeObservable(this);
  }

  @action.bound
  show(id_window: MODALS | MODALS_GRAND_CHART) {
    if (this.list.hasOwnProperty(id_window)) {
      this.list[id_window] = true;
    }
  }

  @action.bound
  close(id_window: MODALS | MODALS_GRAND_CHART) {
    if (this.list.hasOwnProperty(id_window)) {
      this.list[id_window] = false;
    }
  }
}
