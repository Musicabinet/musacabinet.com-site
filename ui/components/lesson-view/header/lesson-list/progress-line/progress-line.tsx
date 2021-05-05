import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './progress-line.module.sass';
import { RootStore } from '../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../constants';

const b = block(style);

type ProgressLineProps = {
  service_name: SERVICE_NAME,
  passed_lesson: number
};
type ProgressLineState = {};

@inject((store: RootStore) => ({
  service_name: store.lessonStore.group_lesson?.collections?.serviceName,
  passed_lesson: store.lessonStore.getPassedLesson
}))
@observer
export class ProgressLine extends React.Component<ProgressLineProps, ProgressLineState> {

  static defaultProps = {
    service_name: '',
    passed_lesson: 0
  };

  render() {
    const { service_name, passed_lesson } = this.props;

    return (
      <div className={b(null, {
        [service_name]: true
      })}>
        <div className={b('line')} style={{
          width: `${passed_lesson}%`
        }} />
      </div>
    );
  }
}
