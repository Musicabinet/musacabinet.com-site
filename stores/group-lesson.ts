import { action, makeObservable, observable } from 'mobx';
import { GroupLessonI } from '../interfaces';
import { CollectionStore } from './collection';
import { LessonStore } from './lesson';
import { RootStore } from './index';

let rootStore: RootStore;

export class GroupLessonStore implements GroupLessonI {
  @observable isFetch: boolean = false;

  @observable id = 0;
  @observable collection_id: undefined | number = undefined;
  @observable sort = 1;
  @observable slug = '';
  @observable meta_title = '';
  @observable meta_description = '';
  @observable meta_keywords = '';
  @observable name = '';
  @observable description = '';
  @observable is_active = true;
  @observable collections: null | CollectionStore = null;
  @observable module_id = 0;
  @observable course_id = 0;
  @observable total_lessons = 0;
  @observable lessons: LessonStore[] = [];

  constructor(initialData: GroupLessonI | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: GroupLessonI) {
    const {
      id,
      collection_id,
      course_id,
      sort,
      slug,
      meta_title,
      meta_description,
      meta_keywords,
      name,
      description,
      is_active,
      collections,
      lessons
    } = data;

    this.id = id;
    this.collection_id = collection_id;
    this.course_id = course_id;
    this.sort = sort;
    this.slug = slug;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.meta_keywords = meta_keywords;
    this.name = name;
    this.description = description;
    this.is_active = is_active;
    this.collections = collections ? new CollectionStore(collections) : null;
    this.lessons = (lessons || []).map((lesson) => new LessonStore(lesson, rootStore));
  }
}
