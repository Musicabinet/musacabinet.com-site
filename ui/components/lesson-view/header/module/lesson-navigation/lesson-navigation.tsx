import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lesson-navigation.module.sass';
import { RootStore } from '../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../constants';
import Router from 'next/router';

const b = block(style);

type LessonNavigationProps = {
  service_name: SERVICE_NAME;
  nextLesson: boolean | string;
  prevLesson: boolean | string;
};
type LessonNavigationState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  nextLesson: store.lessonStore.getNextLesson,
  prevLesson: store.lessonStore.getPrevLesson
}))
@observer
export class LessonNavigation extends React.Component<LessonNavigationProps, LessonNavigationState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    nextLesson: false,
    prevLesson: false
  };

  handlerOnClick = async (uuid: string | boolean) => {
    if (uuid) {
      await Router.push('/lesson/[uuid]', `/lesson/${uuid}`);
    }
  };

  render() {
    const { service_name, prevLesson, nextLesson } = this.props;

    return (
      <div className={b(null, { [service_name]: true })}>
        <button
          onClick={() => this.handlerOnClick(prevLesson)}
          className={b('button', {
            left: true,
            hidden: prevLesson === false
          })}
        />
        <div className={b('title')}>Lesson</div>
        <button
          onClick={() => this.handlerOnClick(nextLesson)}
          className={b('button', {
            right: true,
            hidden: nextLesson === false
          })}
        />
      </div>
    );
  }
}
