import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, CabinetLayout, HistoryStatistics } from '../../../../ui';
import { CustomAppContext } from '../../../../interfaces';
import { redirectToWrapper } from '../../../../core';
import moment from 'moment';


type HistoryPageProps = {};
type HistoryPageState = {};

@inject(() => ({}))
@observer
export default class HistoryPage extends React.Component<HistoryPageProps, HistoryPageState> {

  static async getInitialProps({ store, ctx: { res, query } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));
    await store?.instrumentsStore.getAll();
    const date = String(query.date);

    store?.statisticsListStore.setSelectedDay(date);

    return {
      title: `MC | History ${moment(date).format('D MMMM YYYY')}`,
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout background={'gray'} noStick>
        <CabinetLayout>
          <HistoryStatistics />
        </CabinetLayout>
      </BaseLayout>
    );
  }
}
