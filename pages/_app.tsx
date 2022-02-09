import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import App from 'next/app';
import initializeStore, { RootStore } from '../stores';
import './app.global.sass';
import { Cookie } from '../core';
import { CustomAppContext } from '../interfaces';
import HeadBlock from './head-block';
import { GrandChartFlat, Notifications, PreviewChart, PreviewNotes } from '../ui';
import { GrandChartModal } from '../ui';
import { MODALS_GRAND_CHART } from '../constants';

interface Props {
  pageProps: any;
  initialMobxState: RootStore;
  title: string;
}

@observer
class MusiCabinetApp extends App<Props> {

  public mobxStore: RootStore;
  public grandCharts: React.ReactNode[] = [];

  static async getInitialProps(appContext: CustomAppContext): Promise<any> {
    const ctx: any = appContext.ctx;
    ctx.store = initializeStore();
    ctx.isServer = typeof window === 'undefined';

    const cookie = Cookie.getInstance();
    cookie.init(ctx);

    appContext.store = ctx.store;

    let pageProps: { title: string } = {
      title: ''
    };
    if (appContext.Component && appContext.Component.getInitialProps) {
      // @ts-ignore
      pageProps = await appContext.Component.getInitialProps(appContext);
    }

    return {
      ...pageProps,
      initialMobxState: ctx.store
    };
  }

  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
  }

  getGrandCharts = (): void => {
    const serviceList = this.mobxStore.servicesStore.list;

    if (Array.isArray(serviceList) && serviceList.length > 0 && !this.mobxStore.systemStore.isLoadGrandChart) {
      for (const serviceIndex in serviceList) {
        const serviceStore = serviceList[serviceIndex];

        // Проходим по каждому и инструменту сервиса
        for (const instrumentIndex in serviceStore.instruments) {
          const instrumentStore = serviceStore.instruments[instrumentIndex];

          // Запрос на гранд чарт
          this.grandCharts.push(<GrandChartFlat key={`${serviceStore.id}-${instrumentStore.id}`}
                                                service_id={serviceStore.id}
                                                instrument_id={instrumentStore.id}
                                                modal_name={`${serviceStore.id}-${instrumentStore.id}` as MODALS_GRAND_CHART} />);
        }
      }

      // Устанавливаем флаг что грандчарты загружены
      this.mobxStore.systemStore.setIsLoadGrandChart();
    }
  };

  render() {
    const { pageProps, Component } = this.props;
    this.getGrandCharts();

    return (
      <>
        <Provider {...this.mobxStore}>
          <HeadBlock title={this.props.title} />
          <Component {...pageProps} />
          <Notifications />
          <GrandChartModal />
          <PreviewNotes />
          <PreviewChart />

          {/** Рендерим гранд чарты */}
          {this.grandCharts.map((reactNode) => {
            return reactNode;
          })}
        </Provider>
      </>
    );
  }
}

export default MusiCabinetApp;
