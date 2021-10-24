import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-list.module.sass';
import { RootStore } from '../../../../../stores';
import { InstrumentStore } from '../../../../../stores/instrument';
import { Paragraph, Title } from '../../../../common';
import { TITLE_SIZE } from '../../../../../constants';
import { InstrumentItem } from './instrument-item';

const b = block(style);

type InstrumentListProps = {
  list: InstrumentStore[];
};
type InstrumentListState = {};

@inject((store: RootStore) => ({
  list: store.instrumentsStore.all
}))
@observer
export class InstrumentList extends React.Component<InstrumentListProps, InstrumentListState> {
  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;

    console.log(list);

    return (
      <div className={b(null)}>
        <div className="container g-lg-0">
          <div className="row">
            <div className="col-lg-12">
              <Title size={TITLE_SIZE.SECOND} className={'text-center mb50'}>
                Choose your instrument
              </Title>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center">
              <Paragraph>
                Which one do you want to perfect? Our education system will guide you through the process and let you master any of these instruments.
              </Paragraph>
            </div>
          </div>
        </div>

        <div className="container g-lg-0">
          <div className="row">
            {list.map((instrument, index) => {
              return (
                <InstrumentItem key={instrument.id}
                                instrument={instrument}
                  last={index === list.length - 1}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
