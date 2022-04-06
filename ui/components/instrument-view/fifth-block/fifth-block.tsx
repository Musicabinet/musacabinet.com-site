import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './fifth-block.module.sass';
import { GrandChartFlat, Paragraph, Title } from '../../../common';
import { MODALS_GRAND_CHART, TITLE_SIZE } from '../../../../constants';
import { RootStore, SystemStore } from '../../../../stores';

const b = block(style);

type FifthBlockProps = {
  systemStore: SystemStore;
};
type FifthBlockState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore
}))
@observer
export class FifthBlock extends React.Component<FifthBlockProps, FifthBlockState> {
  static defaultProps = {
    systemStore: {}
  };

  render() {
    const { systemStore } = this.props;

    return (
      <div className={b(null)}>
        <div className='container g-lg-0'>
          <div className='row g-lg-0'>
            <div className='col-lg-10'>
              <Title size={TITLE_SIZE.SERVICE_PAGE} isServiceColor>
                Grand Chart is the heart of our training system
              </Title>
            </div>
          </div>

          <div className='row g-lg-0'>
            <div className='col-lg-10'>
              <Paragraph className={b('text')}>
                It is a table through which you get instant access to any topic and any lesson. And most importantly -
                you get to see your learning progress in real time.
              </Paragraph>
            </div>
          </div>
        </div>

        <div className={b('grand-chart')}>
          <GrandChartFlat service_id={systemStore.service_id} instrument_id={systemStore.instrument_id} modal_name={MODALS_GRAND_CHART.UNIVERSITY_GUITAR} show />
        </div>

        <div className='container'>
          <div className='row g-lg-0'>
            {systemStore.aboutService.map((item) => {
              return (
                <div key={item.title} className='col-lg-4 d-flex'>
                  <div className={b('item', { [systemStore.service_name]: true })}>
                    <div className={b('count')}>{item.count}</div>
                    <div className={b('title')}>{item.title}</div>
                    <div className={b('description')}>{item.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
