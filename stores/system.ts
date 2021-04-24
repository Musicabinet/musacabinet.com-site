import { action, computed, makeObservable, observable } from 'mobx';
import { SERVICE_NAME } from '../constants';

export class SystemStore {

  @observable service_id = 0;
  @observable service_name: SERVICE_NAME | undefined = undefined;
  @observable instrument_id: number = 0;
  @observable instrument_name: string = '';
  @observable instrument_icon: string = '';

  @observable selected_collection_id: number | undefined = undefined;
  @observable selected_course_id: number | undefined = undefined;
  @observable selected_module_id: number | undefined = undefined;
  @observable selected_group_lesson_id: number | undefined = undefined;

  constructor(initialData: SystemStore | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  setServiceId(id: number) {
    this.service_id = id;
  }

  @action.bound
  setServiceName(name: SERVICE_NAME) {
    this.service_name = name;
  }

  @action.bound
  setInstrumentId(id: number) {
    this.instrument_id = id;
  }

  @action.bound
  setInstrumentName(name: string) {
    this.instrument_name = name;
  }

  @action.bound
  setInstrumentIcon(name: string) {
    this.instrument_icon = name;
  }

  @action.bound
  setCollectionId(id: number) {
    this.selected_collection_id = id;
  }

  @action.bound
  setCourseId(id: number) {
    this.selected_course_id = id;
  }

  @action.bound
  setModuleId(id: number) {
    this.selected_module_id = id;
  }

  @action.bound
  setGroupLessonId(id: number) {
    this.selected_group_lesson_id = id;
  }

  @computed
  get showGroupLesson(): boolean {
    return (this.selected_group_lesson_id !== undefined);
  }

  @action
  fillingStore(data: SystemStore) {
    const { service_id, service_name, instrument_id, instrument_name } = data;

    this.service_id = service_id;
    this.service_name = service_name;
    this.instrument_id = instrument_id;
    this.instrument_name = instrument_name;
  }

}
