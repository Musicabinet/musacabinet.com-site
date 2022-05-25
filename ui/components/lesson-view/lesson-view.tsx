import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lesson-view.module.sass';
import { Header } from './header/header';
import { Scores } from './scores/scores';
import { Method } from './method/method';
import { LessonStore, RootStore } from '../../../stores';
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
  lessonStore: LessonStore;
};
type LessonViewState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  instrument_name: store.systemStore.instrument_name,
  uuid: store.lessonStore.uuid,
  onReset: store.lessonStore.reset,
  mapStore: store.mapStore,
  lessonStore: store.lessonStore
}))
@observer
export class LessonView extends React.Component<LessonViewProps, LessonViewState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    instrument_name: '',
    uuid: '',
    onReset: () => console.log('Not set handler'),
    mapStore: {},
    lessonStore: {}
  };

  componentWillUnmount() {
    const { onReset } = this.props;
    onReset();
  }

  async componentDidMount() {
    const { uuid, mapStore } = this.props;

    if (uuid) {
      LocalStorage.set('lesson_id_q', uuid);
      await mapStore.getList();
    }
  }

  async componentDidUpdate(prevProps: Readonly<LessonViewProps>) {
    const { mapStore, lessonStore } = this.props;

    console.log(prevProps.uuid, this.props.uuid);

    if (prevProps.uuid !== this.props.uuid) {
      LocalStorage.set('lesson_id_q', this.props.uuid);
      await mapStore.getList();
      // Сброс выбранной страницы
      lessonStore.resetCurrentScore();
      // Загружаем треку

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
