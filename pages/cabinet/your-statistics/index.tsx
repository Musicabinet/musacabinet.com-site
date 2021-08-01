import * as React from 'react';
import {inject, observer} from 'mobx-react';
import { BaseLayout, CabinetLayout, StatisticDays } from '../../../ui';

type YourStatisticsProps = {};
type YourStatisticsState = {};

@inject(() => ({}))
@observer
export default class YourStatistics extends React.Component<YourStatisticsProps, YourStatisticsState> {
  render() {
    return (
      <BaseLayout background={'gray'} noStick>
        <CabinetLayout>
          <StatisticDays />
        </CabinetLayout>
      </BaseLayout>
    );
  }
}
