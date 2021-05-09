import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { CourseI } from '../../../../../interfaces';

const b = block(style);

type CourseItemProps = {
  is_active: boolean
};
type CourseItemState = {};

@inject(() => ({}))
@observer
export class CourseItem extends React.Component<CourseItemProps & CourseI, CourseItemState> {

  render() {
    const { name, is_active } = this.props;

    console.log('is_active', is_active);

    return (
      <div className={b('item', {
        is_active
      })}>
        {name}
      </div>
    );
  }
}
