import { action, observable } from 'mobx';
import { ScoreI} from '../interfaces';
import { ScoreItemStore } from './score-item';

export class ScoreStore implements ScoreI {

  pathStore = 'admin/scores';

  @observable isFetchVideo = false;
  @observable isFetchDeleteVideo = false;
  @observable id = 0;
  @observable lesson_id = 0;
  @observable name = '';
  @observable video_url = '';
  @observable content = '';
  @observable items: ScoreItemStore[] = [];

  constructor(initialData: ScoreI | null) {

    if (initialData) {
      this.fillingStore(initialData);
    }
  }


  @action
  fillingStore(data: ScoreI) {
    const { id, lesson_id, name, video_url, content, items } = data;

    this.id = id;
    this.lesson_id = lesson_id;
    this.name = name;
    this.video_url = video_url;
    this.content = content;
    this.items = (items || []).map((item) => new ScoreItemStore(item));
  }

}
