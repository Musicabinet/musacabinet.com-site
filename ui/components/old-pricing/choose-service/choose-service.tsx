import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './choose-service.module.sass';
import { ServiceList } from './service-list/service-list';
import { InstrumentList } from './instrument-list/instrument-list';
import { CurrentPrice } from './current-price/current-price';
import { CountMonth } from './count-month/count-month';

const b = block(style);

type ChooseServiceProps = {};
type ChooseServiceState = {};

@inject(() => ({}))
@observer
export class ChooseService extends React.Component<ChooseServiceProps, ChooseServiceState> {
  render() {
    return (
      <div className={b(null)}>
        <InstrumentList />
        <CurrentPrice />
        <CountMonth />
        <ServiceList />
      </div>
    );
  }
}
