import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { GrandChartStore, RootStore } from '../../../../stores';
import { CourseItem } from './course-item';

const b = block(style);

type CoursesProps = {
  grandChartStore: GrandChartStore
};
type CoursesState = {};

@inject((store: RootStore) => ({
  grandChartStore: store.grandChartStore
}))
@observer
export class Courses extends React.Component<CoursesProps, CoursesState> {

  static defaultProps = {
    grandChartStore: {}
  };

  render() {
    const { grandChartStore } = this.props;

    return (
      <div className={b(null)} style={{
        gridTemplateRows: `repeat(${grandChartStore.courses.length}, 170px)`,
        gridTemplateColumns: `repeat(${grandChartStore.courses.length}, 170px)`
      }}>
        {grandChartStore.courses.map((course) => {
          return <CourseItem key={course.id} course={course} />;
        })}
      </div>
    );
  }

}
