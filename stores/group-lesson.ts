import { action, observable } from 'mobx';
import { GroupLessonI, LessonI } from '../interfaces';
import { CollectionStore } from './collection';

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
  @observable lessons: LessonI[] = [];

  constructor(initialData: GroupLessonI | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: GroupLessonI) {
    const {
      id,
      collection_id,
      sort,
      slug,
      meta_title,
      meta_description,
      meta_keywords,
      name,
      description,
      is_active,
      collections
    } = data;

    this.id = id;
    this.collection_id = collection_id;
    this.sort = sort;
    this.slug = slug;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.meta_keywords = meta_keywords;
    this.name = name;
    this.description = description;
    this.is_active = is_active;
    this.collections = collections ? new CollectionStore(collections) : null;
  }
}
