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
import { LocalStorage } from '../../../core';
import { MapStore } from '../../../stores/map';

const b = block(style);

type LessonViewProps = {
  service_name: SERVICE_NAME;
  instrument_name: '';
  uuid: '';
  onReset: () => void;
  mapStore: MapStore;
};
type LessonViewState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  instrument_name: store.systemStore.instrument_name,
  uuid: store.lessonStore.uuid,
  onReset: store.lessonStore.reset,
  mapStore: store.mapStore
}))
@observer
export class LessonView extends React.Component<LessonViewProps, LessonViewState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    instrument_name: '',
    uuid: '',
    onReset: () => console.log('Not set handler'),
    mapStore: {}
  };

  componentWillUnmount() {
    const { onReset } = this.props;
    onReset();
  }

  async componentDidMount() {
    const { uuid, mapStore } = this.props;

    if (uuid) {
      LocalStorage.set('lesson_id_q', uuid);
      console.log('1');
      await mapStore.getList();
    }
  }

  async componentDidUpdate(prevProps: Readonly<LessonViewProps>) {
    const { mapStore } = this.props;

    if (prevProps.uuid !== this.props.uuid) {
      LocalStorage.set('lesson_id_q', this.props.uuid);
      await mapStore.getList();
    }
  }

  render() {
    const { service_name, instrument_name } = this.props;

    return (
      <>
        <div className={b(null)}>
          <Header />
          <div className={b('content')}>
            <div className={b('left')}>
              {service_name === SERVICE_NAME.COLLEGE && instrument_name !== '' && instrument_name == 'Guitar' ? (
                <Charts />
              ) : (
                <Scores />
              )}
            </div>
            <div className={b('right')}>
              <Method />
            </div>
          </div>
        </div>
      </>
    );
  }
}
