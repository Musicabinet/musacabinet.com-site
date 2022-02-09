import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { GrandChartFlatStore } from '../../../../stores';
import { CourseItem } from './course-item';
import { SERVICE_NAME } from '../../../../constants';

const b = block(style);

type CoursesProps = {
  serviceName: SERVICE_NAME;
  grandChartStore: GrandChartFlatStore;
};
type CoursesState = {};

@inject(() => ({}))
@observer
export class Courses extends React.Component<CoursesProps, CoursesState> {

  render() {
    const { grandChartStore, serviceName } = this.props;

    return (
      <div className={b(null)} style={{
        gridTemplateRows: `repeat(${grandChartStore.courses.length}, 170px)`,
        gridTemplateColumns: `repeat(${grandChartStore.courses.length}, 170px)`
      }}>
        {grandChartStore.courses.map((course) => {
          return <CourseItem key={course.id}
                             serviceName={serviceName}
                             course={course}
                             grandChartStore={grandChartStore}
                             isActive={course.id === grandChartStore.selected_course_id} />;
        })}
      </div>
    );
  }

}
