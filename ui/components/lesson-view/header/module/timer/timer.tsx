import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './timer.module.sass';

const b = block(style);

type TimerProps = {};
type TimerState = {};

@inject(() => ({}))
@observer
export class Timer extends React.Component<TimerProps, TimerState> {

  public svgCircleBackground = React.createRef<SVGCircleElement>();

  public radius = 0;
  public circumference = 0;
  public intervalID = 0;
  public timer = 0;

  public mappingTime: { [key: number]: number } = {
    25: 0,
    35: 1,
    45: 2
  };

  public times: { value: number, fillValue: number }[] = [
    {
      value: 25,
      fillValue: 47
    },
    {
      value: 35,
      fillValue: 47
    },
    {
      value: 45,
      fillValue: 70.5
    }
  ];

  componentDidMount() {
    if (this.svgCircleBackground.current) {
      //this.radius = this.svgCircleBackground.current.r.baseVal.value;
      //this.circumference = 2 * Math.PI * this.radius;
      //this.svgCircleBackground.current.style.fill = `${this.circumference} ${this.circumference}`;
    }
  }

  render() {
    return (
      <div className={b(null)}>
        <div className={b('head')} />
        <div className={b('arrow-vertical')} />
        <div className={b('arrow')} />
        <div className={b('time')}>25m</div>
        <svg width={84} height={84}>
          <circle cx={42}
                  cy={42}
                  strokeWidth={4}
                  r={84 / 2}
                  className={b('body')} />
          <circle cx={42}
                  cy={42}
                  r={38}
                  className={b('progress')} />
          <circle cx={42}
                  cy={42}
                  r={18}
                  ref={this.svgCircleBackground}
                  className={b('background', {school: true})} />
          <circle cx={42}
                  cy={42}
                  r={18}
                  className={b('turn')} />
        </svg>
      </div>
    );
  }
}
