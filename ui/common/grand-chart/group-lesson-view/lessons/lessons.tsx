import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import { LessonI } from '../../../../../interfaces';
import { LessonItem } from './item';
import { RootStore } from '../../../../../stores';

const b = block(style);

type LessonsProps = {
  selected_uuid: string,
  list: LessonI[]
};
type LessonsState = {};

@inject((store: RootStore) => ({
  selected_uuid: store.lessonStore.uuid
}))
@observer
export class Lessons extends React.Component<LessonsProps, LessonsState> {

  static defaultProps = {
    selected_uuid: ''
  };

  render() {
    const { selected_uuid, list } = this.props;

    return (
      <div className={b(null)}>
        {list.map((lesson) => {
          return (
            <LessonItem key={lesson.id}
                        id={lesson.id}
                        isActive={(lesson.uuid === selected_uuid)}
                        uuid={lesson.uuid}
                        group_lesson_id={lesson.group_lesson_id}
                        sort={lesson.sort}
                        slug={lesson.slug}
                        meta_title={lesson.meta_title}
                        meta_description={lesson.meta_description}
                        meta_keywords={lesson.meta_keywords}
                        name={lesson.name}
                        description={lesson.description}
                        duration_minute={lesson.duration_minute}
                        is_active={lesson.is_active}
                        scores={lesson.scores}
                        charts={lesson.charts}
                        accompaniments={lesson.accompaniments}
                        lesson_list={lesson.lesson_list}
                        progress_second={lesson.progress_second} />
          );
        })}
      </div>
    );
  }

}
