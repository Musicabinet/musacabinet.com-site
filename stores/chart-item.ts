import { action, observable } from 'mobx';
import { ChartItemContentI, ChartItemI } from '../interfaces/chart';
import { CHART_TYPE } from '../constants';

export class ChartItemStore implements ChartItemI {

  @observable id = 0;
  @observable sort = 0;
  @observable chart_id = 0;
  @observable chart_type_id: CHART_TYPE = CHART_TYPE.IMAGE;
  @observable content: ChartItemContentI = {};

  constructor(initialData: ChartItemI | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: ChartItemI) {
    const {id, sort, chart_id, chart_type_id, content} = data;

    this.id = id;
    this.sort = sort;
    this.chart_id = chart_id;
    this.chart_type_id = chart_type_id;
    this.content = content;
  }

}
