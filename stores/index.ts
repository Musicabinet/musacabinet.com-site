import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { MenuListStore } from './menu-list';
import { ModalsStore } from './modals';
import { AuthStore } from './auth';
import { NotificationsStore } from './notifications';
import { UserStore } from './user';
import { ServicesStore } from './services';
import { GrandChartStore } from './grand-chart';
import { SystemStore } from './system';
import { LessonStore } from './lesson';
import { PlayerStore } from './player';
import { LessonProgressStore } from './lesson-progress';
import { InstrumentsStore } from './instruments';
import { MetronomeStore } from './metronome';
import { NextModuleStore } from './next-module';
import { WebsocketStore } from './websocket';
import { PricingStore } from './pricing';
import { PurchasesStore } from './purchases';
import { ProductsStore } from './products';
import { InstrumentStore } from './instrument';
import { GroupLessonStore } from './group-lesson';
import { TutorialsStore } from './tutorials';
import { StatisticsListStore } from './statistics-list';
import { MapStore } from './map';
import { GrandChartFlatStore } from './grand-chart-flat.store';
import { YourStatisticsStore } from './your-statistics';
import { GeoPluginStore } from './geo-plugin.store';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

configure({
  enforceActions: 'never'
});


export class RootStore {
  public systemStore: SystemStore;
  public userStore: UserStore;
  public menuListStore: MenuListStore;
  public modalsStore: ModalsStore;
  public authStore: AuthStore;
  public notificationsStore: NotificationsStore;
  public servicesStore: ServicesStore;
  public grandChartStore: GrandChartStore;
  public grandChartFlatStore: GrandChartFlatStore;
  public lessonStore: LessonStore;
  public playerStore: PlayerStore;
  public lessonProgress: LessonProgressStore;
  public instrumentsStore: InstrumentsStore;
  public metronomeStore: MetronomeStore;
  public nextModule: NextModuleStore;
  public websocketStore: WebsocketStore;
  public pricingStore: PricingStore;
  public purchasesStore: PurchasesStore;
  public productsStore: ProductsStore;
  public tutorialsStore: TutorialsStore;
  public statisticsListStore: StatisticsListStore;
  public mapStore: MapStore;
  public yourStatisticsStore: YourStatisticsStore;
  public geoPluginStore: GeoPluginStore;

  constructor(iData: RootStore | null) {
    this.notificationsStore = new NotificationsStore(iData && iData.notificationsStore ? iData.notificationsStore : null);
    this.systemStore = new SystemStore(iData && iData.systemStore ? iData.systemStore : null);
    this.servicesStore = new ServicesStore(iData && iData.servicesStore ? iData.servicesStore : null, this);
    this.userStore = new UserStore(iData && iData.userStore ? iData.userStore : null, this);
    this.websocketStore = new WebsocketStore(this);
    this.menuListStore = new MenuListStore(iData && iData.menuListStore ? iData.menuListStore : null);
    this.modalsStore = new ModalsStore();
    this.authStore = new AuthStore(iData && iData.authStore ? iData.authStore : null, this);
    this.grandChartStore = new GrandChartStore(iData && iData.grandChartStore ? iData.grandChartStore : null, this);
    this.grandChartFlatStore = new GrandChartFlatStore(iData && iData.grandChartFlatStore ? iData.grandChartFlatStore : null, this);
    this.lessonStore = new LessonStore(iData && iData.lessonStore ? iData.lessonStore : null, this);
    this.playerStore = new PlayerStore(iData && iData.playerStore ? iData.playerStore : null, this);
    this.lessonProgress = new LessonProgressStore(iData && iData.lessonProgress ? iData.lessonProgress : null, this);
    this.instrumentsStore = new InstrumentsStore(iData && iData.instrumentsStore ? iData.instrumentsStore : null);
    this.metronomeStore = new MetronomeStore(iData && iData.metronomeStore ? iData.metronomeStore : null);
    this.nextModule = new NextModuleStore(iData && iData.nextModule ? iData.nextModule : null, this);
    this.pricingStore = new PricingStore(iData && iData.pricingStore ? iData.pricingStore : null, this);
    this.purchasesStore = new PurchasesStore(iData ? iData.purchasesStore : null, this);
    this.productsStore = new ProductsStore(iData ? iData.productsStore : null, this);
    this.tutorialsStore = new TutorialsStore(iData ? iData.tutorialsStore : null);
    this.statisticsListStore = new StatisticsListStore(iData ? iData.statisticsListStore : null, this);
    this.mapStore = new MapStore(iData ? iData.mapStore : null, this);
    this.yourStatisticsStore = new YourStatisticsStore(null);
    this.geoPluginStore = new GeoPluginStore(iData ? iData.geoPluginStore : null);
  }
}

let store: any = null;

export default function initializeStore(initialData: null | RootStore = null) {
  if (isServer) {
    return new RootStore(initialData);
  }
  if (store === null) {
    store = new RootStore(initialData);
  }
  return store;
}

export {
  SystemStore,
  UserStore,
  MenuListStore,
  ModalsStore,
  AuthStore,
  NotificationsStore,
  ServicesStore,
  GrandChartStore,
  GrandChartFlatStore,
  LessonStore,
  PlayerStore,
  LessonProgressStore,
  InstrumentsStore,
  MetronomeStore,
  NextModuleStore,
  WebsocketStore,
  PricingStore,
  PurchasesStore,
  ProductsStore,
  InstrumentStore,
  GroupLessonStore
};
