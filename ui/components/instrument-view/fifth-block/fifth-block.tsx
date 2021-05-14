import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './fifth-block.module.sass';
import { Paragraph, Title } from '../../../common';
import { SERVICE_NAME, TITLE_SIZE } from '../../../../constants';
import { RootStore } from '../../../../stores';
import { AboutServiceItemI } from '../../../../stores/system';

const b = block(style);

type FifthBlockProps = {
  service_name: SERVICE_NAME,
  list: AboutServiceItemI[]
};
type FifthBlockState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  list: store.systemStore.aboutService
}))
@observer
export class FifthBlock extends React.Component<FifthBlockProps, FifthBlockState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    list: []
  };

  render() {
    const { service_name, list } = this.props;

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

          <div className='row g-lg-0'>
            {list.map((item) => {
              return <div className='col-lg-4 d-flex'>
                <div className={b('item', { [service_name]: true })}>
                  <div className={b('count')}>{item.count}</div>
                  <div className={b('title')}>{item.title}</div>
                  <div className={b('description')}>{item.description}</div>
                </div>
              </div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
