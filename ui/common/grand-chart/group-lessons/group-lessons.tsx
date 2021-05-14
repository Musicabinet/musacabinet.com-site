import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lessons.module.sass';
import { RootStore } from '../../../../stores';
import { CourseI, ModuleI, GroupLessonsFinal } from '../../../../interfaces';
import { GroupLessonItem } from './item';

const b = block(style);

type GroupLessonsProps = {
  course_list: CourseI[],
  module_list: ModuleI[],
  list: GroupLessonsFinal
};
type GroupLessonsState = {};

@inject((store: RootStore) => ({
  course_list: store.grandChartStore.courses,
  module_list: store.grandChartStore.modules,
  list: store.grandChartStore.finalData
}))
@observer
export class GroupLessons extends React.Component<GroupLessonsProps, GroupLessonsState> {

  static defaultProps = {
    course_list: [],
    module_list: [],
    list: {}
  };

  getGroupLessons = (course_module_id: string) => {
    const { list } = this.props;
    return list[course_module_id] || [];
  };

  render() {
    const { course_list, module_list } = this.props;

    return (
      <div className={b(null)}
           style={{
             width: `${module_list.length * 230}px`
           }}>
        {course_list.map((course) => {
          return module_list.map((module) => {
            return (<div key={module.id} className={b('block')}>

              {this.getGroupLessons(`${course.id}-${module.id}`).map((group_lesson) => {
                return <GroupLessonItem key={group_lesson.id}
                                        id={group_lesson.id}
                                        name={group_lesson.name}
                                        collection_id={group_lesson.collection_id}
                                        module_id={group_lesson.module_id}
                                        course_id={group_lesson.course_id}
                                        total_lessons={group_lesson.total_lessons}
                                        lessons={group_lesson.lessons}
                                        slug={group_lesson.slug}
                                        sort={group_lesson.sort}
                                        meta_title={group_lesson.meta_title}
                                        meta_description={group_lesson.meta_description}
                                        meta_keywords={group_lesson.meta_keywords}
                                        description={group_lesson.description}
                                        is_active={group_lesson.is_active} />;
              })}

            </div>);
          });
        })}
      </div>
    );
  }
}
