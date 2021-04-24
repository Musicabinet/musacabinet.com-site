import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { CourseI } from '../../../../../interfaces';

const b = block(style);

type CourseItemProps = {};
type CourseItemState = {};

@inject(() => ({}))
@observer
export class CourseItem extends React.Component<CourseItemProps & CourseI, CourseItemState> {
  render() {
    const { name } = this.props;

    return (
      <div className={b('item')}>
        {name}
      </div>
    );
  }
}
