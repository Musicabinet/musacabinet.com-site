import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import { RootStore } from '../../../../../stores';
import { LessonI } from '../../../../../interfaces';
import { MODALS, SERVICE_NAME } from '../../../../../constants';
import Router from 'next/router';
import { SystemStore } from '../../../../../stores/system';
import { UserStore } from '../../../../../stores/user';

const b = block(style);

type LessonItemProps = {
  systemStore: SystemStore,
  user: UserStore,
  isShowTrial: boolean,
  isActive: boolean,
  service_name: SERVICE_NAME,
  onCloseModal: (id_modal: string) => void
};
type LessonItemState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  user: store.userStore,
  service_name: store.systemStore.service_name,
  onCloseModal: store.modalsStore.close
}))
@observer
export class LessonItem extends React.Component<LessonItemProps & LessonI, LessonItemState> {

  circle = React.createRef<SVGSVGElement>();
  circleFill = React.createRef<SVGSVGElement>();

  static defaultProps = {
    systemStore: {},
    user: {},
    breadcrumbs: [],
    service_name: SERVICE_NAME.SCHOOL,
    onCloseModal: () => console.log('Not set handler')
  };

  componentDidMount() {
    if (this.circle && this.circle.current) {
      this.circle.current.style.strokeDasharray = `0 113`;
    }
  }

  handleOnClick = async () => {
    const { uuid, onCloseModal, user, systemStore, isShowTrial } = this.props;
    const isPurchaseUser = user.checkSubscription(systemStore.service_id, systemStore.instrument_id);

    if (isPurchaseUser.length > 0 ? false : !isShowTrial) {
      return false;
    }

    await Router.push('/lesson/[uuid]', `/lesson/${uuid}`);
    onCloseModal(MODALS.GRAND_CHART);
  };

  render() {
    const { id, name, service_name, isActive, isShowTrial, user, systemStore } = this.props;
    const isPurchaseUser = user.checkSubscription(systemStore.service_id, systemStore.instrument_id);

    return (
      <div onClick={this.handleOnClick}
           className={b('item', {
             [service_name]: true,
             [`active-${service_name}`]: isActive,
             ['blocked']: (isPurchaseUser.length > 0 ? false : !isShowTrial)
           })}>

        <div className={b('id')}>{name.replace(/\D+/g, '')}</div>
        <svg className={b('pie')} width={40} height={40} viewBox='0 0 40 40'>
          {/*
          // @ts-ignore */}
          <circle ref={this.circleFill}
                  className={b('fill')}
                  id='two'
                  strokeWidth={2}
                  r={18}
                  cx={20}
                  cy={20}
                  fill='transparent' />
          {/*
          // @ts-ignore */}
          <circle ref={this.circle}
                  className={b('circle')}
                  id={`id_${id}`}
                  strokeWidth={2}
                  r={18}
                  cx={20}
                  cy={20}
                  fill='transparent' />
        </svg>

      </div>
    );
  }
}
