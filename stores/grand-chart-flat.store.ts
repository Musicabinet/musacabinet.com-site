import { action, computed, makeObservable, observable } from 'mobx';
import { API } from '../core';
import { GrandChartResponse } from '../responsible';
import { CourseStore } from './course';
import { ModuleStore } from './module';
import { GroupLessonStore } from './group-lesson';
import { RootStore } from './index';
import { StatisticsListStore } from './statistics-list';
import { MODALS_GRAND_CHART, SERVICE_ID, SERVICE_NAME } from '../constants';

let rootStore: RootStore;

export class GrandChartFlatStore {

  @observable isFetch = false;
  @observable isEmpty = false;
  @observable isShowGoldLine = false;

  @observable modal_name: MODALS_GRAND_CHART = MODALS_GRAND_CHART.SCHOOL_GUITAR;

  @observable service_id: SERVICE_ID = 0;
  @observable instrument_id = 0;
  @observable service_name: SERVICE_NAME = SERVICE_NAME.SCHOOL;
  @observable courses: CourseStore[] = [];
  @observable modules: ModuleStore[] = [];
  @observable groupLessons: GroupLessonStore[][] = [];

  @observable selected_course_id = 0;
  @observable selected_module_id = 0;
  @observable selected_group_lesson_id = 0;
  @observable isShowGroupLessonDetail = false;

  @observable statistics: StatisticsListStore = new StatisticsListStore(null, rootStore);

  constructor(initialData: GrandChartFlatStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  setServiceId(service_id: SERVICE_ID) {
    this.service_id = service_id;
  }

  @action.bound
  setInstrumentId(instrument_id: number) {
    this.instrument_id = instrument_id;
  }

  @action.bound
  setServiceName(service_name: SERVICE_NAME) {
    this.service_name = service_name;
  }

  @action.bound
  setModalName(modal_name: MODALS_GRAND_CHART) {
    this.modal_name = modal_name;
  }

  @action.bound
  setCourseId(course_id: number) {
    this.selected_course_id = course_id;
  }

  @action.bound
  setModuleId(module_id: number) {
    this.selected_module_id = module_id;
  }

  @action.bound
  setGroupLessonId(group_lesson_id: number) {
    this.selected_group_lesson_id = group_lesson_id;
  }

  @action.bound
  setShowGroupLessonDetail(show = false) {
    this.isShowGroupLessonDetail = show;
  }

  @action.bound
  async get(service_id: number, instrument_id: number) {
    try {
      const {
        courses,
        modules,
        group_lessons
      } = await API.request<GrandChartResponse>(`grand-chart/list?service_id=${service_id}&instrument_id=${instrument_id}`);

      // Записываем данные
      this.courses = (courses || []).map((course) => new CourseStore(course));
      this.modules = (modules || []).map((module) => new ModuleStore(module));
      this.groupLessons = (group_lessons || []).map((group_lesson_arr) =>
        group_lesson_arr.map((group_lesson) => new GroupLessonStore(group_lesson, rootStore))
      );

      // Получаем статистику
      await this.statistics.get(service_id, instrument_id);

    } catch (e) {
      console.error(`Error in method GrandChartFlatStore.get : `, e);
    }
  }

  @computed
  get groupLessonDetail(): GroupLessonStore[] {
    if (
      this.selected_course_id === 0 ||
      this.selected_group_lesson_id === 0
    ) {
      return [];
    }

    let completeGroupLessons: GroupLessonStore[] = [];

    this.groupLessons.forEach((groupLessonAr) => {
      groupLessonAr.forEach((groupLesson) => {
        if (groupLesson.id === this.selected_group_lesson_id) {
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

          console.log('complete[groupLesson.course_id]',complete[groupLesson.course_id]);

          complete[groupLesson.course_id] += lesson.duration_minute;
        });
      });
    });

    return complete;
  }

  @action
  fillingStore(data: GrandChartFlatStore) {
    const { courses, modules, groupLessons } = data;

    this.courses = (courses || []).map((course) => new CourseStore(course));
    this.modules = (modules || []).map((module) => new ModuleStore(module));
    this.groupLessons = (groupLessons || []).map((group_lesson_arr) =>
      group_lesson_arr.map((group_lesson) => new GroupLessonStore(group_lesson, rootStore))
    );
  }

}
