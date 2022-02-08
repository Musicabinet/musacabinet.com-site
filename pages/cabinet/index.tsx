import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { CustomAppContext } from '../../interfaces';
import { redirectToWrapper } from '../../core';
import { BaseLayout, CabinetLayout, CabinetSubscriptions } from '../../ui';

type CabinetPageProps = {};
type CabinetPageState = {};

@inject(() => ({}))
@observer
export default class CabinetPage extends React.Component<CabinetPageProps, CabinetPageState> {
  static async getInitialProps({ store, ctx: { res } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));
    await store?.servicesStore.getList();


    // Получаение списка гранд чартов
    const serviceList = store?.servicesStore.list;

    if (Array.isArray(serviceList) && serviceList.length > 0) {
      for (const serviceIndex in serviceList) {
        const serviceStore = serviceList[serviceIndex];

        // Проходим по каждому и инструменту сервиса
        for (const instrumentIndex in serviceStore.instruments) {
          const instrumentStore = serviceStore.instruments[instrumentIndex];

          // Запрос на гранд чарт
          await store?.grandChartStore.get(serviceStore.id, instrumentStore.id);
        }
      }
    }

    return {
      title: 'MC | Subscriptions',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout background={'gray'} noStick>
        <CabinetLayout>
          <CabinetSubscriptions />
        </CabinetLayout>
      </BaseLayout>
    );
  }
}
