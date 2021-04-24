import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import { LessonI } from '../../../../../../interfaces';
import { LessonItem } from './item';

const b = block(style);

type LessonsProps = {
  list: LessonI[]
};
type LessonsState = {};

@inject(() => ({}))
@observer
export class Lessons extends React.Component<LessonsProps, LessonsState> {
  render() {
    const { list } = this.props;

    return (
      <div className={b(null)}>
        {list.map((lesson) => {
          return (
            <LessonItem id={lesson.id}
                        isActive={false}
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
                        accompaniments={lesson.accompaniments} />
          );
        })}
      </div>
    );
  }

}
