import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { CourseI } from '../../../../interfaces';
import { RootStore } from '../../../../stores';
import { SERVICE_NAME } from '../../../../constants';

const b = block(style);

type CourseItemProps = {
  is_active: boolean;
  number: number;
  service_name: SERVICE_NAME;
};
type CourseItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class CourseItem extends React.Component<CourseItemProps & CourseI, CourseItemState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  render() {
    const { name, is_active, number, service_name } = this.props;

    return (
      <div
        className={b('item', {
          is_active
        })}
      >
        <div className={b('toolbar', { [service_name]: !is_active })}>Course {number}</div>
        <span className={b('name')}>{name}</span>
      </div>
    );
  }
}
