import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { RootStore } from '../../../../stores';
import { CourseI } from '../../../../interfaces';
import { CourseItem } from './item';
import { SERVICE_NAME } from '../../../../constants';

const b = block(style);

type CoursesProps = {
  service_name: SERVICE_NAME,
  list: CourseI[],
  selected_course_id: number
};
type CoursesState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  list: store.grandChartStore.courses,
  selected_course_id: store.systemStore.selected_course_id
}))
@observer
export class Courses extends React.Component<CoursesProps, CoursesState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    list: [],
    selected_course_id: 0
  };

  render() {
    const { service_name,  list, selected_course_id } = this.props;
    let number = 1;

    return (
      <div className={b(null, { [service_name]:true })}>
        {list.map((course) => {
          return (<CourseItem key={course.id}
                              number={number++}
                              id={course.id}
                              name={course.name}
                              is_active={(selected_course_id === course.id)} />);
        })}
      </div>
    );
  }
}
