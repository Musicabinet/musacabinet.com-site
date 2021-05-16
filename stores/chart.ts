import { action, observable } from 'mobx';
import { ChartI } from '../interfaces/chart';
import { ChartItemStore } from './chart-item';

export class ChartStore implements ChartI {

  @observable id = 0;
  @observable lesson_id = 0;
  @observable items: ChartItemStore[] = [];

  constructor(initialData: ChartI | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: ChartI) {
    const { id, lesson_id, items } = data;

    this.id = id;
    this.lesson_id = lesson_id;
    this.items = (items || []).map((item) => new ChartItemStore(item));
  }

}
