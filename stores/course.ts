import { action, computed, observable } from 'mobx';
import { CourseI } from '../interfaces';

export class CourseStore implements CourseI {

  @observable id = 0;
  @observable name = '';
  @observable number_course = 0;

  constructor(initialData: CourseStore | CourseI | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @computed
  get courseNumber(): string {
    return `Course ${this.number_course}`;
  }

  @action
  fillingStore(data: CourseStore | CourseI) {
    const { id, name, number_course } = data;

    this.id = id;
    this.name = name;
    this.number_course = number_course;
  }

}
