import { action, computed, makeObservable, observable } from 'mobx';
import { LessonListI } from '../interfaces';
import { ScoreStore } from './score';

export class LessonListItemStore implements LessonListI {

  @observable id = 0;
  @observable uuid = '';
  @observable group_lesson_id = 0;
  @observable sort = 0;
  @observable slug = '';
  @observable meta_title = '';
  @observable meta_description = '';
  @observable meta_keywords = '';
  @observable name = '';
  @observable description = '';
  @observable duration_minute = 0;
  @observable is_active = false;
  @observable color = '';
  @observable scores: ScoreStore[] = [];

  constructor(initialData: LessonListItemStore | LessonListI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillStore(initialData);
    }
  }

  @computed
  get nameForCircle(): string {
    return this.name.replace('Lesson ', '').replace(',', '.');
  }


  @computed
  get isGrey(): boolean {
    return ['#D8D8D8', '#AE6E5E5', '#FFFFFF'].includes(this.color);
  }

  @computed
  get nameScore(): string {
    return (this.scores[0]) ? this.scores[0].name : this.name;
  }

  @action
  fillStore(data: LessonListItemStore | LessonListI) {
    const {
      id,
      uuid,
      group_lesson_id,
      sort,
      slug,
      meta_title,
      meta_description,
      meta_keywords,
      name,
      description,
      duration_minute,
      is_active,
      color,
      scores
    } = data;

    this.id = id;
    this.uuid = uuid;
    this.group_lesson_id = group_lesson_id ?? 0;
    this.sort = sort;
    this.slug = slug;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.meta_keywords = meta_keywords;
    this.name = name;
    this.description = description;
    this.duration_minute = duration_minute;
    this.is_active = is_active;
    this.color = color;
    this.scores = (scores || []).map((score) => new ScoreStore(score));
  }
}
