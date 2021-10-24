import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-list.module.sass';
import { RootStore } from '../../../../../stores';
import { InstrumentI } from '../../../../../interfaces';
import { InstrumentItem } from './instrument-item';
import { Paragraph } from '../../../../common';
import { Ribbon } from './ribbon/ribbon';

const b = block(style);

type InstrumentListProps = {
  list: InstrumentI[];
};
type InstrumentListState = {};

@inject((store: RootStore) => ({
  list: store.servicesStore.instruments
}))
@observer
export class InstrumentList extends React.Component<InstrumentListProps, InstrumentListState> {
  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;

    return (
      <div className={b(null)}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 position-relative">
              <Ribbon />
              <div className={b('list')}>
                {list.map((instrument) => {
                  return (
                    <InstrumentItem
                      key={instrument.id}
                      id={instrument.id}
                      service_id={instrument.service_id}
                      sort={instrument.sort}
                      slug={instrument.slug}
                      meta_title={instrument.meta_title}
                      meta_description={instrument.meta_description}
                      meta_keywords={instrument.meta_keywords}
                      name={instrument.name}
                      description={instrument.description}
                      icon={instrument.icon}
                      is_active={instrument.is_active}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <Paragraph className={b('paragraph')}>
                Choose levels of education and duration of your subscription
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
