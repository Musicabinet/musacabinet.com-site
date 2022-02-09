import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import { GrandChartFlatStore, LessonStore, RootStore } from '../../../../../stores';
import { LessonItem } from './lesson-item';
import { MapProgressI } from '../../../../../interfaces';

const b = block(style);

type LessonsProps = {
  grandChartStore: GrandChartFlatStore;
  lessons: LessonStore[],
  lessonStore: LessonStore,
  isShowTrial: boolean;
};
type LessonsState = {
  mapProgressLesson: MapProgressI
};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore
}))
@observer
export class Lessons extends React.Component<LessonsProps, LessonsState> {

  static defaultProps = {
    lessonStore: {}
  };

  state = {
    mapProgressLesson: {}
  };

  componentDidMount() {
    const { grandChartStore } = this.props;
    const findCourse = grandChartStore.statistics.list[grandChartStore.selected_course_id];
    const findModule = findCourse.find((item) => item.module_id === grandChartStore.selected_module_id);
    let mapProgressLesson: MapProgressI = {};

    if (findModule) {
      findModule.lessons.forEach((lesson) => {
        mapProgressLesson[lesson.uuid] = {
          total: lesson.duration_minute,
          progress: lesson.total_progress_minute
        };
      });
    }

    this.setState({
      mapProgressLesson
    });
  }

  render() {
    const { lessons, lessonStore, isShowTrial, grandChartStore } = this.props;
    const { mapProgressLesson } = this.state;

    return (
      <div className={b(null)}>
        {lessons.map((lesson, index) => {
          return <LessonItem key={lesson.id}
                             grandChartStore={grandChartStore}
                             lesson={lesson}
                             isShowTrial={isShowTrial && index === 0}
                             isActive={lesson.uuid === lessonStore.uuid}
                             mapProgressLesson={mapProgressLesson} />;
        })}
      </div>
    );
  }
}
