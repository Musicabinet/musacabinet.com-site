import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './timer.module.sass';
import { RootStore } from '../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../constants';

const b = block(style);

type TimerProps = {
  uuid: string,
  service_name: SERVICE_NAME,
  amountTime: 15 | 30 | 45 | 60,
  onMessageAtTheEnd: () => void
};
type TimerState = {
  timeIndex: number
};

@inject((store: RootStore) => ({
  uuid: store.lessonStore.uuid,
  service_name: store.systemStore.service_name
}))
@observer
export class Timer extends React.Component<TimerProps, TimerState> {

  static defaultProps = {
    uuid: '',
    service_name: SERVICE_NAME.SCHOOL,
    amountTime: 30,
    onMessageAtTheEnd: () => console.log('Not set handler')
  };

  circle = React.createRef<SVGCircleElement>();
  circleFill = React.createRef<SVGCircleElement>();
  radius = 0;
  circumference = 0;
  intervalID = 0;
  timer = 0;

  mappingTime = {
    15: 0,
    30: 1,
    45: 2,
    60: 3
  };

  times = [
    {
      value: 15,
      fillValue: 23.5,
      className: 'time-15'
    },
    {
      value: 30,
      fillValue: 47,
      className: 'time-30'
    },
    {
      value: 45,
      fillValue: 70.5,
      className: 'time-45'
    },
    {
      value: 60,
      fillValue: 94.1,
      className: 'time-60'
    }
  ];

  state = {
    timeIndex: this.mappingTime[this.props.amountTime],
    currentTime: 0
  };

  componentDidMount() {
    if (this.circle.current) {
      this.radius = this.circle.current.r.baseVal.value;
      this.circumference = 2 * Math.PI * this.radius;
      this.circle.current.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
      // Запускаем таймер
      this.startTime();
    }
  }

  componentDidUpdate(prevProps: TimerProps) {
    if (this.props.uuid !== prevProps.uuid) {
      clearInterval(this.intervalID);

      if (this.circle.current && this.circleFill.current) {
        this.circle.current.style.stroke = '';
        this.circleFill.current.style.stroke = '';

        setTimeout(() => {

          if (this.circleFill.current) {
            this.circleFill.current.style.strokeDasharray = `${0} 94`;
            setTimeout(() => {

              this.timer = 0;
              setTimeout(() => {
                this.startTime();
              }, 150);

            }, 100);
          }

        }, 50);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handlerOnChangeTimeIndex = () => {
    clearInterval(this.intervalID);

    if (this.circle.current && this.circleFill.current) {
      this.circle.current.style.stroke = '';
      this.circleFill.current.style.stroke = '';

      setTimeout(() => {
        if (this.circleFill.current) {
          this.circleFill.current.style.strokeDasharray = `${0} 94`;

          setTimeout(() => {
            this.timer = 0;

            setTimeout(() => {
              this.setState((state) => ({
                timeIndex: ((state.timeIndex + 1) > (this.times.length - 1)) ? 0 : state.timeIndex + 1
              }));

              this.startTime();
            }, 150);
          }, 100);
        }
      }, 50);
    }
  };

  startTime = () => {
    const { onMessageAtTheEnd } = this.props;

    this.intervalID = window.setInterval(() => {
      const { value, fillValue } = this.times[this.state.timeIndex];
      this.timer = +(this.timer + +(1 / 60).toFixed(2)).toFixed(2);
      const updatePercent = +((this.timer * fillValue) / value).toFixed(2);
      if (fillValue <= updatePercent) {

        if (this.circle.current && this.circleFill.current) {
          this.circle.current.style.stroke = 'red';
          this.circleFill.current.style.stroke = 'red';
        }

        onMessageAtTheEnd();
        clearInterval(this.intervalID);
      } else {

        if (this.circleFill.current && this.circleFill.current.style) {
          this.circleFill.current.style.strokeDasharray = `${updatePercent} 94`;
        }

      }
    }, 1000);
  };

  render() {
    const { service_name } = this.props;
    const { timeIndex } = this.state;
    const { value, className } = this.times[timeIndex];

    return (
      <div onClick={this.handlerOnChangeTimeIndex}
           className={b(null, {
             [service_name]: true,
             [className]: true
           })}>
        <div className={b('current-time')}>{value}m</div>

        <svg className={b('container')} width={78} height={78} viewBox='0 0 78 78'>
          <circle className={b('circle')}
                  ref={this.circle}
                  strokeWidth={4}
                  cx={39}
                  cy={39}
                  r={(78 / 2) - (4 * 2)}
                  fill='transparent' />

          <circle r='15'
                  ref={this.circleFill}
                  fill='transparent'
                  cx='39'
                  cy='39'
                  className={b('fill')} />
        </svg>
      </div>
    );
  }
}
