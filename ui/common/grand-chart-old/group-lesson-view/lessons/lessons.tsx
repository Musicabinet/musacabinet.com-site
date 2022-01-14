import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import { LessonItem } from './item';
import { LessonStore, RootStore } from '../../../../../stores';

const b = block(style);

type LessonsProps = {
  isShowTrial: boolean;
  selected_uuid: string;
  list: LessonStore[];
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
    const { selected_uuid, list, isShowTrial } = this.props;

    return (
      <div className={b(null)}>
        {list.map((lesson, index) => {
          return (
            <LessonItem key={lesson.id}
                        lesson={lesson}
                        isShowTrial={isShowTrial && index === 0}
                        isActive={lesson.uuid === selected_uuid}
            />
          );
        })}
      </div>
    );
  }
}
