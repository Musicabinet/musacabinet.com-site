import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './grand-chart-flat.module.sass';
import { RootStore, GrandChartFlatStore } from '../../../stores';
import { Header } from './header/header';
import { MODALS_GRAND_CHART, SERVICE_ID, SERVICE_MAPPING } from '../../../constants';
import { Courses } from './courses/courses';
import { GroupLessons } from './group-lessons/group-lessons';
import { handleDetectClick } from '../../../helpers';

const b = block(style);

type GrandChartFlatProps = {
  store: RootStore;

  modal_name: MODALS_GRAND_CHART;
  service_id: number;
  instrument_id: number;
  show: boolean;
};
type GrandChartFlatState = {};

@inject((store: RootStore) => ({
  store: store
}))
@observer
export class GrandChartFlat extends React.Component<GrandChartFlatProps, GrandChartFlatState> {

  public containerModalRef = React.createRef<HTMLDivElement>();
  public grandChartStore = new GrandChartFlatStore(null, this.props.store);

  static defaultProps = {
    store: {},
    show: false
  };

  async componentDidMount() {
    const { service_id, instrument_id, modal_name } = this.props;

    try {
      // Получаем данные по необходимому гранд чарту
      await this.grandChartStore.get(service_id, instrument_id);

      // Записываем данные
      this.grandChartStore.setServiceId(service_id);
      this.grandChartStore.setInstrumentId(instrument_id);
      this.grandChartStore.setServiceName(SERVICE_MAPPING[service_id as SERVICE_ID]);
      this.grandChartStore.setModalName(modal_name);

    } catch (e) {
      console.error(`Error in component GrandChartFlat : `, e);
    }
  }

  componentDidUpdate(_prevProps: Readonly<GrandChartFlatProps>) {
    const { store: { modalsStore }, modal_name } = this.props;
    const isOpen = modalsStore.list[modal_name];

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.handleOnDetect);
      }, 100);
    } else {
      document.removeEventListener('click', this.handleOnDetect);
    }
  }

  handleOnDetect = (e: MouseEvent) => {
    handleDetectClick(this.containerModalRef, this.handleOnClose, e);
  };

  handleOnClose = () => {
    const { store: { modalsStore }, modal_name } = this.props;
    modalsStore.close(modal_name);
  };

  render() {
    const { service_id, instrument_id, store, modal_name, show } = this.props;
    const serviceName = SERVICE_MAPPING[service_id as SERVICE_ID];

    return (
      <>
        <div data-grand-chart-show={store.modalsStore.list[modal_name]}
             className={b('container', {
               show: store.modalsStore.list[modal_name] ?? show,
               isPage: show
             })}>
          <div className={b(null)}
               ref={this.containerModalRef}>
            <Header serviceName={serviceName}
                    instrument_id={instrument_id}
                    grandChart={this.grandChartStore} />
            <div className={b('body')}>
              <Courses serviceName={serviceName}
                       grandChartStore={this.grandChartStore} />
              <GroupLessons serviceName={serviceName}
                            service_id={service_id}
                            instrument_id={instrument_id}
                            grandChartStore={this.grandChartStore} />
            </div>
          </div>
        </div>
        <div className={b('overlay', {
          show: store.modalsStore.list[modal_name]
        })} />
      </>

    );
  }
}
