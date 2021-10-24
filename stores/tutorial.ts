import { action, makeObservable, observable } from 'mobx';
import { TutorialI } from '../interfaces';
import moment from 'moment';

export class TutorialStore implements TutorialI {

  @observable id = 0;
  @observable service_id = 0;
  @observable title = '';
  @observable description = '';
  @observable content = '';
  @observable created_at = moment();
  @observable updated_at = moment();

  constructor(initialData: TutorialStore | TutorialI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: TutorialStore | TutorialI) {
    const { id, service_id, title, description, content, created_at, updated_at } = data;

    this.id = id;
    this.service_id = service_id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.created_at = moment(created_at);
    this.updated_at = moment(updated_at);
  }

}
