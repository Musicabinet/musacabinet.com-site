import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './timer.module.sass';
import { LessonStore, RootStore, SystemStore } from '../../../../../../stores';

const b = block(style);

type TimerProps = {
  systemStore: SystemStore,
  lessonStore: LessonStore,
  uuid: string;
  amountTime: 25 | 35 | 45;
};
type TimerState = {
  timeIndex: number;
  currentTime: number;
};

@inject((store: RootStore) => ({
  uuid: store.lessonStore.uuid,
  systemStore: store.systemStore,
  lessonStore: store.lessonStore
}))
@observer
export class Timer extends React.Component<TimerProps, TimerState> {

  public svgCircleBackground = React.createRef<SVGCircleElement>();
  public svgProgress = React.createRef<SVGCircleElement>();

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
      fillValue: 118
    },
    {
      value: 35,
      fillValue: 180
    },
    {
      value: 45,
      fillValue: 70.5
    }
  ];

  static defaultProps = {
    systemStore: {},
    lessonStore: {},
    uuid: ''
  };

  state = {
    timeIndex: this.mappingTime[this.props.amountTime],
    currentTime: 0
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps: Readonly<TimerProps>) {
    if (this.props.uuid !== prevProps.uuid) {
      if (this.svgProgress.current) {

        setTimeout(() => {
          if (this.svgProgress.current) {
            this.svgProgress.current.style.strokeDasharray = `${0}px 236px`;
            setTimeout(() => {
              this.timer = 0;
              setTimeout(() => {
                this.startTimer();
              }, 150);
            }, 100);
          }
        }, 50);
      }
    }
  }

  startTimer = () => {
    if (this.svgProgress.current) {
      setTimeout(() => {
        const { value, fillValue } = this.times[this.state.timeIndex];
        this.timer = +(this.timer + +(1 / 60).toFixed(2)).toFixed(2);
        const updatePercent = +((this.timer * fillValue) / value).toFixed(2);

        if (fillValue <= updatePercent) {

        } else {
          if (this.svgProgress.current && this.svgProgress.current.style) {
            this.svgProgress.current.style.strokeDasharray = `${updatePercent}px 236px`;
          }
          this.startTimer();
        }
      }, 1000);
    }
  };

  handleOnChangeTime = () => {
    console.log('change');
    if (this.svgProgress.current) {
      // Очищаем прогресс
      this.svgProgress.current.style.strokeDasharray = `${0}px 236px`;
      // Таймер обнуляем
      this.timer = 0;
      // Устанавливаем новый таймер
      this.setState((state) => ({
        timeIndex: state.timeIndex + 1 > this.times.length - 1 ? 0 : state.timeIndex + 1
      }));
    }
  };

  render() {
    const { systemStore } = this.props;
    const { timeIndex } = this.state;
    const { value: currentTime } = this.times[timeIndex];


    return (
      <div className={b(null, { [systemStore.service_name]: true, [currentTime]: true })}
           onClick={this.handleOnChangeTime}>

        <div className={b('head')} />
        <div className={b('arrow-vertical')} />
        <div className={b('arrow')} />
        <div className={b('time')}>{currentTime}m</div>
        <svg width={84} height={84}>
          <circle cx={42}
                  cy={42}
                  strokeWidth={4}
                  r={84 / 2}
                  className={b('body')} />
          <circle cx={42}
                  cy={42}
                  r={38}
                  ref={this.svgProgress}
                  className={b('progress')} />
          <circle cx={42}
                  cy={42}
                  r={18}
                  ref={this.svgCircleBackground}
                  className={b('background')} />
          <circle cx={42}
                  cy={42}
                  r={18}
                  className={b('turn')} />
        </svg>

      </div>
    );
  }
}
