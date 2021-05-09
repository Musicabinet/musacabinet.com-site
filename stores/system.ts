import { action, computed, makeObservable, observable } from 'mobx';
import { SERVICE_NAME } from '../constants';
import { LIST_ICON } from '../ui/common/icons';

export class SystemStore {

  @observable service_id = 0;
  @observable service_name: SERVICE_NAME | undefined = undefined;
  @observable instrument_id: number = 0;
  @observable instrument_name: string = '';
  @observable instrument_icon: LIST_ICON.GUITAR | LIST_ICON.KEYBOARD | LIST_ICON.SAXOPHONE = LIST_ICON.GUITAR;

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
  setInstrumentIcon(name: LIST_ICON.GUITAR | LIST_ICON.SAXOPHONE | LIST_ICON.KEYBOARD) {
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

  @computed
  get serviceNameLowerCase(): string {
    return this.service_name?.toLowerCase() || 'Not found';
  }

  @computed
  get title(): string {
    const current = `${this.serviceNameLowerCase}-${this.instrument_name}`;

    const title = {
      'school-saxophone': 'Let\'s start your saxophone<br/> playing together',
      'school-keyboard': 'Let\'s start your keyboard<br/> playing together',
      'school-guitar': 'Let\'s start your music<br/> together',

      'college-saxophone': 'Take your saxophone<br/> playing to the next level',
      'college-keyboard': 'Take your keyboard playing to<br/> the next level',
      'college-guitar': 'Take your guitar playing to<br/> the next level',

      'university-saxophone': 'Become a saxophone<br/> professional',
      'university-keyboard': 'Become a keyboard<br/> professional',
      'university-guitar': 'Become a guitar<br/> professional'
    };
    // @ts-ignore
    return title[current] || '';
  }

  @computed
  get subTitle() {
    const subTitle = {
      'school-saxophone': 'Your Saxophone  |  The Internet  |  30+ min a day',
      'school-keyboard': 'Your Keyboard  |  The Internet  |  30+ min a day',
      'school-guitar': 'Your Guitar  |  The Internet  |  30+ min a day',

      'college-saxophone': 'Your Saxophone  |  The Internet  |  45+ min a day',
      'college-keyboard': 'Your Keyboard  |  The Internet  |  45+ min a day',
      'college-guitar': 'Your Guitar  |  The Internet  |  45+ min a day',

      'university-saxophone': 'Your Saxophone  |  The Internet  |  60+ min a day',
      'university-keyboard': 'Your Keyboard  |  The Internet  |  60+ min a day',
      'university-guitar': 'Your Guitar  |  The Internet  |  60+ min a day'
    };

    // @ts-ignore
    return subTitle[this.current];
  }

  @action
  fillingStore(data: SystemStore) {
    const { service_id, service_name, instrument_id, instrument_name, instrument_icon } = data;

    this.service_id = service_id;
    this.service_name = service_name;
    this.instrument_id = instrument_id;
    this.instrument_name = instrument_name;
    this.instrument_icon = instrument_icon;
  }

}
