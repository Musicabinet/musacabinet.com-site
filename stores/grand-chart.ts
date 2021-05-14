import { action, computed, makeObservable, observable } from 'mobx';
import { SystemStore } from './system';
import { CollectionI, CourseI, ModuleI } from '../interfaces';
import { GroupLessonI, GroupLessonsFinal } from '../interfaces/group-lesson';
import { API } from '../core';
import { GrandChartResponse } from '../responsible';

export class GrandChartStore {

  @observable isFetch: boolean = false;
  @observable isEmpty: boolean = false;

  @observable courses: CourseI[] = [];
  @observable modules: ModuleI[] = [];
  @observable collections: CollectionI[] = [];
  @observable groupLessons: GroupLessonI[] = [];
  @observable finalData: GroupLessonsFinal = {};

  @observable showGroupLessonDetail: boolean = false;

  public systemStore: SystemStore;

  constructor(initialData: GrandChartStore | null, { systemStore }: { systemStore: SystemStore }) {
    makeObservable(this);

    this.systemStore = systemStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getList() {

    this.isFetch = true;

    try {

      this.reset();

      const {
        courses,
        modules,
        collections,
        group_lessons
      } = await API.request<GrandChartResponse>(`grand-chart/list?service_id=${this.systemStore.service_id}&instrument_id=${this.systemStore.instrument_id}`);


      // Формирование объекта с группой уроков
      let formationGroupLessons: { [key: string]: GroupLessonI[]; } = {};

      group_lessons.forEach((group_lesson) => {
        const { course_id, module_id } = group_lesson;
        const key = `${course_id}-${module_id}`;

        if (!formationGroupLessons.hasOwnProperty(key)) {
          formationGroupLessons[key] = [];
        }

        formationGroupLessons[key].push(group_lesson);
      });

      this.finalData = JSON.parse(JSON.stringify(formationGroupLessons));
      this.courses = [...courses];
      this.modules = [...modules];
      this.collections = [...collections];
      this.groupLessons = [...group_lessons];

      this.isEmpty = (this.modules.length === 0);

      console.log('record grand chart', this.modules.length);
    } catch (e) {
      console.error(`Error in method GrandChartStore.getList : `, e);
    } finally {
      this.isFetch = false;
    }
  }

  @action.bound
  setShowGroupLessonDetail(show: boolean = true) {
    this.showGroupLessonDetail = show;
  }

  @action.bound
  reset() {
    this.finalData = {};
    this.courses = [];
    this.modules = [];
    this.collections = [];
    this.groupLessons = [];
  }

  @computed
  get groupLessonDetail(): GroupLessonI[] {
    if (this.systemStore.selected_course_id === undefined || this.systemStore.selected_group_lesson_id === undefined) {
      return [];
    }

    return this.finalData[`${this.systemStore.selected_course_id}-${this.systemStore.selected_module_id}`] || [];
  }

  @action
  fillingStore(data: GrandChartStore) {
    const { courses, modules, collections, groupLessons, finalData } = data;

    this.courses = courses;
    this.modules = modules;
    this.collections = collections;
    this.groupLessons = groupLessons;
    this.finalData = finalData;
  }

}
