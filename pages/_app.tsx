import * as React from 'react';
import { Provider } from 'mobx-react';
import App from 'next/app';
import initializeStore, { RootStore } from '../stores';
import './app.global.sass';
import { Cookie } from '../core';
import { CustomAppContext } from '../interfaces';
import HeadBlock from './head-block';
import { Notifications, PreviewChart, PreviewNotes } from '../ui';
import { GrandChartModal } from '../ui';
//import TagManager from 'react-gtm-module';

interface Props {
  pageProps: any;
  initialMobxState: RootStore;
  title: string,
}

class MusiCabinetApp extends App<Props> {

  public mobxStore: RootStore;


  static async getInitialProps(appContext: CustomAppContext): Promise<any> {
    const ctx: any = appContext.ctx;
    ctx.store = initializeStore();
    ctx.isServer = typeof window === 'undefined';

    const cookie = Cookie.getInstance();
    cookie.init(ctx);

    appContext.store = ctx.store;

    await appContext.store?.authStore.check();

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

  componentDidMount() {
    /*TagManager.initialize({
      gtmId: 'GTM-PPT365K'
    })*/
  }

  render() {
    const { pageProps, Component } = this.props;

    return (
      <>
        <Provider {...this.mobxStore}>
          <HeadBlock title={this.props.title} />
          <Component {...pageProps} />
          <Notifications />
          <GrandChartModal />
          <PreviewNotes />
          <PreviewChart />
        </Provider>
      </>
    );
  }
}

export default MusiCabinetApp;

