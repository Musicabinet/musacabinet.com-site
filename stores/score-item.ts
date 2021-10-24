import { action, makeObservable, observable } from 'mobx';
import { ScoreItemContentI, ScoreItemI } from '../interfaces';
import { API } from '../core';
import { METHODS_REQUEST } from '../constants';

export class ScoreItemStore implements ScoreItemI {
  pathStore = 'admin/scores-item';

  @observable id = 0;
  @observable sort = 1;
  @observable score_id = 0;
  @observable score_type_id = 0;
  @observable content: ScoreItemContentI = {};

  constructor(initialData: ScoreItemI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async update(values: ScoreItemContentI) {
    try {
      await API.request(`${this.pathStore}/${this.id}`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData({ content: JSON.stringify(values) })
      });
    } catch (e) {
      console.error(`Error in method ScoreItemStore.update : `, e);
    }
  }

  @action
  fillingStore(data: ScoreItemI) {
    const { id, sort, score_id, score_type_id, content } = data;

    this.id = id;
    this.sort = sort;
    this.score_id = score_id;
    this.score_type_id = score_type_id;
    this.content = content;
  }
}
