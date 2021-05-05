import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './time-left.module.sass';
import { RootStore } from '../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../constants';
import { Play } from './play/play';

const b = block(style);

type TimeLeftProps = {
  service_name: SERVICE_NAME,
  time_left: string[],
};
type TimeLeftState = {};

@inject((store: RootStore) => ({
  service_name: store.lessonStore.group_lesson?.collections?.serviceName,
  time_left: store.lessonStore.timeLeft
}))
@observer
export class TimeLeft extends React.Component<TimeLeftProps, TimeLeftState> {

  static defaultProps = {
    service_name: SERVICE_NAME,
    time_left: []
  };

  render() {
    const { service_name, time_left } = this.props;
    const [hour, minute, second] = time_left;

    return <div className={b(null, {
      [service_name]: true
    })}>
      <div className={b('text')}>Lesson's time left</div>
      <Play />
      <div className={b('time')}>
        <div className={b('time-block')}>{hour}</div>
        <span className={b('time-colon')}>:</span>
        <div className={b('time-block')}>{minute}</div>
        <span className={b('time-colon')}>:</span>
        <div className={b('time-block')}>{second}</div>
      </div>
    </div>;
  }
}
