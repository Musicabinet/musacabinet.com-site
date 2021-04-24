import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import { RootStore } from '../../../../../../stores';
import { LessonI } from '../../../../../../interfaces';
import { SERVICE_NAME } from '../../../../../../constants';

const b = block(style);

type LessonItemProps = {
  isActive: boolean,
  service_name: SERVICE_NAME
};
type LessonItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class LessonItem extends React.Component<LessonItemProps & LessonI, LessonItemState> {

  circle = React.createRef<SVGSVGElement>();
  circleFill = React.createRef<SVGSVGElement>();

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  componentDidMount() {
    if (this.circle && this.circle.current) {
      this.circle.current.style.strokeDasharray = `0 113`;
    }
  }

  render() {
    const { id, name, service_name, isActive } = this.props;

    return (
      <div className={b('item', {
        [service_name]: true,
        [`active-${service_name}`]: isActive
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
