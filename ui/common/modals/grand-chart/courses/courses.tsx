import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { RootStore } from '../../../../../stores';
import { CourseI } from '../../../../../interfaces';
import { CourseItem } from './item';

const b = block(style);

type CoursesProps = {
  list: CourseI[]
};
type CoursesState = {};

@inject((store: RootStore) => ({
  list: store.grandChartStore.courses
}))
@observer
export class Courses extends React.Component<CoursesProps, CoursesState> {

  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;

    return (
      <div className={b(null)}>
        {list.map((course) => {
          return (<CourseItem id={course.id} name={course.name} />);
        })}
      </div>
    );
  }
}
