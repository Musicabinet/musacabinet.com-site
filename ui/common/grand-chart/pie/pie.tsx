import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './pie.module.sass';

const b = block(style);

type PieProps = {
  id: number,
  percent: number,
  circle: React.Ref<SVGCircleElement>,
  circleFill: React.Ref<SVGCircleElement>,
  classCircle: string
};
type PieState = {};

@inject(() => ({}))
@observer
export class Pie extends React.Component<PieProps, PieState> {

  render() {
    const { id, percent, circle, circleFill, classCircle } = this.props;

    return (
      <div className={b(null)}>
        <div className={b('percent')}>{percent}%</div>
        <svg className={b('container')} width={40} height={40} viewBox='0 0 40 40'>
          <circle ref={circleFill}
                  className={b('fill')}
                  id='two'
                  strokeWidth={2}
                  r={18}
                  cx={20}
                  cy={20}
                  fill='transparent' />
          <circle ref={circle}
                  className={`${b('circle')} ${classCircle}`}
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
