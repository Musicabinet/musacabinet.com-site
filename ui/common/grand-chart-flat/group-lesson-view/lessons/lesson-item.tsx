import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import {
  GrandChartFlatStore,
  LessonStore,
  ModalsStore,
  RootStore,
  UserStore
} from '../../../../../stores';
import Router from 'next/router';
import { MapProgressI } from '../../../../../interfaces';

const b = block(style);

type LessonItemProps = {
  mapProgressLesson: MapProgressI;
  grandChartStore: GrandChartFlatStore;
  lesson: LessonStore,
  isShowTrial: boolean,
  isActive: boolean,

  userStore: UserStore,
  modalsStore: ModalsStore
};
type LessonItemState = {};

@inject((store: RootStore) => ({
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

  componentDidUpdate(prevProps: Readonly<LessonItemProps>) {
    if (Object.keys(prevProps.mapProgressLesson).length !== Object.keys(this.props.mapProgressLesson).length) {
      const { mapProgressLesson, lesson } = this.props;
      const { total, progress } = mapProgressLesson[lesson.uuid];

      let percent = 0;
      if (progress >= total) {
        percent = 100;
      } else {
        percent = Math.round((progress * 100) / total);
      }

      // Вычисляем на сколько зарисовать кружок
      const fill = Math.round((113 * percent) / 100);

      if (this.circle && this.circle.current) {
        this.circle.current.style.strokeDasharray = `${fill} 113`;
      }
    }
  }

  handleOnClick = async () => {
    const { lesson, modalsStore, userStore, grandChartStore, isShowTrial } = this.props;

    const isPurchaseUser = userStore.checkSubscription(grandChartStore.service_id, grandChartStore.instrument_id);

    if (isPurchaseUser.length > 0 ? false : !isShowTrial) {
      return false;
    }

    await Router.push('/lesson/[uuid]', `/lesson/${lesson.uuid}`);
    modalsStore.close(grandChartStore.modal_name);
  };

  render() {
    const { lesson, isShowTrial, grandChartStore, isActive, userStore } = this.props;
    const isPurchaseUser = userStore.checkSubscription(grandChartStore.service_id, grandChartStore.instrument_id);

    return (<div className={b('item', {
      [grandChartStore.service_name]: true,
      [`active-${grandChartStore.service_name}`]: isActive,
      ['blocked']: isPurchaseUser.length > 0 ? false : !isShowTrial
    })}
                 onClick={this.handleOnClick}>
      <div className={b('id', { isGrey: lesson.isGrey })}>{lesson.numberLesson}</div>
      <div className={b('background')} style={{ background: lesson.color }} />
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
