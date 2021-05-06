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
  list: InstrumentStore[]
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
        <div className='container g-lg-0'>
          <div className='row'>
            <div className='col-lg-12'>
              <Title size={TITLE_SIZE.SECOND} className={'text-center mb50'}>Choose your instrument</Title>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-8 offset-lg-2 text-center mb50'>
              <Paragraph>
                Each one of them has its special unque methods. If you are not sure you can take a test to find where we
                recommend you to start
              </Paragraph>
            </div>
          </div>
        </div>

        <div className='container g-lg-0'>
          <div className='row'>
            {list.map((instrument, index) => {
              return <InstrumentItem key={instrument.id}
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
                                     last={(index === (list.length - 1))} />;
            })}
          </div>
        </div>

      </div>
    );
  }
}
