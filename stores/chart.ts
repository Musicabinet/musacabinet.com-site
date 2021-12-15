import { action, makeObservable, observable } from 'mobx';
import { ChartI } from '../interfaces/chart';
import { ChartItemStore } from './chart-item';

export class ChartStore implements ChartI {
  @observable id = 0;
  @observable lesson_id = 0;
  @observable title = '';
  @observable sub_title = '';
  @observable items: ChartItemStore[] = [];

  constructor(initialData: ChartI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: ChartI) {
    const { id, lesson_id, title, sub_title, items } = data;

    this.id = id;
    this.lesson_id = lesson_id;
    this.title = title;
    this.sub_title = sub_title;
    this.items = (items || []).map((item) => new ChartItemStore(item));
  }
}
