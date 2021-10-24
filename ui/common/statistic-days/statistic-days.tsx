import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './statistic-days.module.sass';
import Item from './item';
import { InstrumentsStore, RootStore } from '../../../stores';

const b = block(style);

type StatisticDaysProps = {
  instrumentsStore: InstrumentsStore
};
type StatisticDaysState = {};

@inject((store: RootStore) => ({
  instrumentsStore: store.instrumentsStore
}))
@observer
export class StatisticDays extends React.Component<StatisticDaysProps, StatisticDaysState> {

  static defaultProps = {
    instrumentsStore: {}
  };

  render() {
    const { instrumentsStore } = this.props;

    return (
      <div className={b(null)}>

        {Object.keys(instrumentsStore.groupByInstrument).map((key) => {
          let component: React.ReactNode[] = [];


          const result =  instrumentsStore.groupByInstrument[key].map((instrument) => {
            if(!instrument.is_active){
              return null;
            }

            return <Item key={instrument.id} instrument={instrument} />;
          });

          component.push(result);
          component.push(<div className={b('divider')} />);

          return component;
        })}

      </div>
    );
  }
}
