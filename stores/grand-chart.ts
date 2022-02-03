import { action, computed, makeObservable, observable } from 'mobx';
import { CollectionI, GroupLessonsFinal } from '../interfaces';
import { API } from '../core';
import { GrandChartResponse } from '../responsible';
import { GroupLessonStore, RootStore } from './index';
import { ModuleStore } from './module';
import { CourseStore } from './course';

let rootStore: RootStore;

export class GrandChartStore {
  @observable isFetch = false;
  @observable isEmpty = false;
  @observable isShowGoldLine = false;

  @observable courses: CourseStore[] = [];
  @observable modules: ModuleStore[] = [];
  @observable collections: CollectionI[] = [];
  @observable groupLessons: GroupLessonStore[][] = [];
  @observable finalData: GroupLessonsFinal = {};
  @observable detailGroupLesson: GroupLessonStore = new GroupLessonStore(null, rootStore);

  @observable showGroupLessonDetail: boolean = false;

  constructor(initialData: GrandChartStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getList() {
    this.isFetch = true;

    try {
      this.reset();

      const { courses, modules, group_lessons } = await API.request<GrandChartResponse>(
        `grand-chart/list?service_id=${rootStore.systemStore.service_id}&instrument_id=${rootStore.systemStore.instrument_id}`
      );

      // Записываем данные
      this.courses = (courses || []).map((course) => new CourseStore(course));
      this.modules = (modules || []).map((module) => new ModuleStore(module));
      this.groupLessons = (group_lessons || []).map((group_lesson_arr) =>
        group_lesson_arr.map((group_lesson) => new
          GroupLessonStore(group_lesson, rootStore)
        )
      );
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
  setIsShowGoldLine(value: boolean) {
    this.isShowGoldLine = value;
  }

  @action.bound
  setDetailGroupLesson(groupLesson: GroupLessonStore = new GroupLessonStore(null, rootStore)) {
    this.detailGroupLesson = groupLesson;
  }

  @action.bound
  clearDetailGroupLesson() {
    this.detailGroupLesson = new GroupLessonStore(null, rootStore);
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
  get groupLessonDetail(): GroupLessonStore[] {
    if (
      rootStore.systemStore.selected_course_id === undefined ||
      rootStore.systemStore.selected_group_lesson_id === undefined
    ) {
      return [];
    }

    let completeGroupLessons: GroupLessonStore[] = [];

    this.groupLessons.forEach((groupLessonAr) => {
      groupLessonAr.forEach((groupLesson) => {
        if (groupLesson.id === rootStore.systemStore.selected_group_lesson_id) {
          completeGroupLessons.push(groupLesson);
        }
      });
    });

    return completeGroupLessons;
  }

  @computed
  get totalTimeCollections(): { [key: string]: number } {
    let complete: { [key: string]: number } = {};
    this.groupLessons.forEach((groupLessons) => {
      groupLessons.forEach((groupLesson) => {
        groupLesson.lessons.forEach((lesson) => {
          if (!complete[groupLesson.course_id]) {
            complete[groupLesson.course_id] = 0;
          }
          complete[groupLesson.course_id] += lesson.duration_minute;
        });
      });
    });

    return complete;
  }

  @action
  fillingStore(data: GrandChartStore) {
    const { courses, modules, collections, groupLessons, finalData } = data;

    this.courses = courses;
    this.modules = modules;
    this.collections = collections;
    this.groupLessons = (groupLessons || []).map((group_lesson_arr) =>
      group_lesson_arr.map((group_lesson) => new
        GroupLessonStore(group_lesson, rootStore)
      )
    );
    this.finalData = finalData;
  }
}
