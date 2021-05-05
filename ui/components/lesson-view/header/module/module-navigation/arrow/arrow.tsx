import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './arrow.module.sass';
import { LessonDirection } from '../../../../../../../interfaces';

const b = block(style);

type ArrowProps = {
  hidden: boolean,
  direction: LessonDirection.LEFT | LessonDirection.RIGHT,
  onClick: (direction: LessonDirection.LEFT | LessonDirection.RIGHT) => void
};
type ArrowState = {};

@inject(() => ({}))
@observer
export class Arrow extends React.Component<ArrowProps, ArrowState> {

  handlerOnClick = () => {
    const { direction, onClick } = this.props;
    onClick(direction);
  };

  render() {
    const { direction, hidden } = this.props;

    return (
      <button onClick={this.handlerOnClick}
              className={b(null, {
                [direction]: true,
                hidden
              })} />
    );
  }
}
