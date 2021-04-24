import { action, observable } from 'mobx';
import { AccompanimentI, LessonI, ScoreI } from '../interfaces';
import { API } from '../core';
import { GroupLessonStore } from './group-lesson';
import { ScoreStore } from './score';
import { AccompanimentStore } from './accompaniment';

export class LessonStore implements LessonI {

  @observable id = 0;
  @observable uuid = '';
  @observable group_lesson_id: number | undefined = undefined;
  @observable sort = 0;
  @observable slug = '';
  @observable meta_title = '';
  @observable meta_description = '';
  @observable meta_keywords = '';
  @observable name = '';
  @observable description = '';
  @observable duration_minute = 0;
  @observable is_active = false;
  @observable scores: ScoreI[] = [];
  @observable group_lesson: GroupLessonStore | undefined = undefined;
  @observable accompaniments: AccompanimentI[] = [];

  constructor(initialData: LessonStore | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async get(uuid: string) {
    try {
      const response = await API.request<LessonI>(`lessons/${uuid}`);
      this.fillingStore(response);

    } catch (e) {
      console.error(`Error im method LessonStore.get : `, e);
    }
  }

  @action
  fillingStore(data: LessonStore | LessonI) {
    const {
      id, uuid, group_lesson_id, sort, slug, group_lesson, scores, accompaniments,
      meta_title, meta_description, meta_keywords, name, description, duration_minute, is_active
    } = data;

    this.id = id;
    this.uuid = uuid;
    this.group_lesson_id = group_lesson_id;
    this.sort = sort;
    this.slug = slug;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.meta_keywords = meta_keywords;
    this.name = name;
    this.description = description;
    this.duration_minute = duration_minute;
    this.is_active = is_active;
    this.group_lesson = (group_lesson) ? new GroupLessonStore(group_lesson) : undefined;
    this.scores = (scores || []).map((score) => new ScoreStore(score));
    this.accompaniments = (accompaniments || []).map((accompaniment) => new AccompanimentStore(accompaniment));
  }

}
