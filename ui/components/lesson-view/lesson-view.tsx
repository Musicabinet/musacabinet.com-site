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
  onReset: () => void
};
type LessonViewState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  onReset: store.lessonStore.reset
}))
@observer
export class LessonView extends React.Component<LessonViewProps, LessonViewState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    onReset: () => console.log('Not set handler')
  };

  componentWillUnmount() {
    const { onReset } = this.props;
    onReset();
    console.log('unmount lesson');
  }

  render() {
    const { service_name } = this.props;

    return (
      <>
        <div className={b(null)}>
          <Header />
          <div className={b('content')}>
            <div className={b('left')}>
              {(service_name !== SERVICE_NAME.SCHOOL) ? <Charts /> : <Scores />}
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
