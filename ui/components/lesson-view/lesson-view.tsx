import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lesson-view.module.sass';
import { Header } from './header/header';
import { Scores } from './scores/scores';
import { Method } from './method/method';
import { RootStore } from '../../../stores';
import { SERVICE_NAME } from '../../../constants';
import { Charts } from './charts/charts';
import { NextModule } from '../../common';

const b = block(style);

type LessonViewProps = {
  service_name: SERVICE_NAME,
  instrument_name: '',
  onReset: () => void
};
type LessonViewState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  instrument_name: store.systemStore.instrument_name,
  onReset: store.lessonStore.reset
}))
@observer
export class LessonView extends React.Component<LessonViewProps, LessonViewState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    instrument_name: '',
    onReset: () => console.log('Not set handler')
  };

  componentWillUnmount() {
    const { onReset } = this.props;
    onReset();
    console.log('unmount lesson');
  }

  render() {
    const { service_name, instrument_name } = this.props;

    return (
      <>
        <div className={b(null)}>
          <Header />
          <div className={b('content')}>
            <div className={b('left')}>
              {(service_name === SERVICE_NAME.COLLEGE && (instrument_name !== '' && instrument_name == 'Guitar')) ? <Charts /> : <Scores />}
            </div>
            <div className={b('right')}>
              <Method />
            </div>
          </div>
        </div>
        <NextModule />
      </>
    );
  }
}
