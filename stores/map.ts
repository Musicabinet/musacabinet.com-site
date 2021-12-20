import { action, computed, makeObservable, observable } from 'mobx';
import { MapI } from '../interfaces';
import { RootStore } from './index';
import { API } from '../core';
import { METHODS_REQUEST } from '../constants';

let rootStore: RootStore;

export class MapStore {

  @observable list: MapI = {};

  constructor(initialData: MapStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getList() {
    try {
      this.list = await API.request<MapI>(`lesson-progress/list`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData({
          service_id: rootStore.systemStore.service_id,
          instrument_id: rootStore.systemStore.instrument_id
        })
      });
    } catch (e) {
      console.error(`Error in method MapStore.getList : `, e);
    }
  }


  @computed
  get nextLesson(): string {
    const currentCourseId = rootStore.systemStore.selected_course_id;
    const currentModuleId = rootStore.systemStore.selected_module_id;
    let linkUUID: string = '';

    if (currentCourseId && currentModuleId) {
      // Находим след.урок
      const findIndexCurrentModule = this.list[currentCourseId].findIndex((item) => item.module_id === currentModuleId);
      // Проверяем есть ли следующий элемент
      const nextIndexModule = findIndexCurrentModule + 1;
      if (this.list[currentCourseId][nextIndexModule]) {
        for (let lesson of this.list[currentCourseId][nextIndexModule].lessons) {
          if (lesson.percent_pass < 100) {
            linkUUID = lesson.uuid;
            break;
          }
        }
      } else {
        for (let lesson of this.list[currentCourseId][0].lessons) {
          if (lesson.percent_pass < 100) {
            linkUUID = lesson.uuid;
            break;
          }
        }
      }
    }

    return linkUUID;
  }

  @computed
  get prevLesson(): string {
    const currentCourseId = rootStore.systemStore.selected_course_id;
    const currentModuleId = rootStore.systemStore.selected_module_id;
    let linkUUID: string = '';

    if (currentCourseId && currentModuleId) {
      // Находим след.урок
      const findIndexCurrentModule = this.list[currentCourseId].findIndex((item) => item.module_id === currentModuleId);
      // Проверяем есть ли следующий элемент
      const nextIndexModule = findIndexCurrentModule - 1;
      if (this.list[currentCourseId][nextIndexModule]) {
        for (let lesson of this.list[currentCourseId][nextIndexModule].lessons) {
          if (lesson.percent_pass < 100) {
            linkUUID = lesson.uuid;
            break;
          }
        }
      } else {
        for (let lesson of this.list[currentCourseId][this.list[currentCourseId].length - 1].lessons) {
          if (lesson.percent_pass < 100) {
            linkUUID = lesson.uuid;
            break;
          }
        }
      }
    }

    return linkUUID;
  }

  @action
  fillingStore(data: MapStore) {
    const { list } = data;
    this.list = list;
  }

}
