import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import { LessonStore, ModalsStore, RootStore, SystemStore, UserStore } from '../../../../../stores';
import Router from 'next/router';
import { MODALS } from '../../../../../constants';

const b = block(style);

type LessonItemProps = {
  lesson: LessonStore,
  isShowTrial: boolean,
  isActive: boolean,

  systemStore: SystemStore,
  userStore: UserStore,
  modalsStore: ModalsStore
};
type LessonItemState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  userStore: store.userStore,
  modalsStore: store.modalsStore
}))
@observer
export class LessonItem extends React.Component<LessonItemProps, LessonItemState> {

  public circle = React.createRef<SVGCircleElement>();
  public circleFill = React.createRef<SVGCircleElement>();

  static defaultProps = {
    systemStore: {},
    userStore: {},
    modalsStore: {}
  };

  componentDidMount() {
    if (this.circle && this.circle.current) {
      this.circle.current.style.strokeDasharray = `0 113`;
    }
  }

  handleOnClick = async () => {
    const { lesson, modalsStore, userStore, systemStore, isShowTrial } = this.props;
    const isPurchaseUser = userStore.checkSubscription(systemStore.service_id, systemStore.instrument_id);

    if (isPurchaseUser.length > 0 ? false : !isShowTrial) {
      return false;
    }

    await Router.push('/lesson/[uuid]', `/lesson/${lesson.uuid}`);
    modalsStore.close(MODALS.GRAND_CHART);
  };

  render() {
    const { lesson, isShowTrial, systemStore, isActive, userStore } = this.props;
    const isPurchaseUser = userStore.checkSubscription(systemStore.service_id, systemStore.instrument_id);

    return (<div className={b('item', {
      [systemStore.service_name]: true,
      [`active-${systemStore.service_name}`]: isActive,
      ['blocked']: isPurchaseUser.length > 0 ? false : !isShowTrial
    })}
                 onClick={this.handleOnClick}>
      <div className={b('id')}>{lesson.numberLesson}</div>
      <svg className={b('pie')} width={40} height={40} viewBox='0 0 40 40'>
        <circle ref={this.circleFill}
                className={b('fill')}
                id='two'
                strokeWidth={2}
                r={18}
                cx={20}
                cy={20}
                fill='transparent' />
        <circle ref={this.circle}
                className={b('circle')}
                id={`id_${lesson.id}`}
                strokeWidth={2}
                r={18}
                cx={20}
                cy={20}
                fill='transparent' />
      </svg>
    </div>);

  }
}
