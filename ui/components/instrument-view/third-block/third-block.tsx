import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './third-block.module.sass';
import { RootStore } from '../../../../stores';
import { SERVICE_NAME, TITLE_SIZE } from '../../../../constants';
import { Title } from '../../../common';

const b = block(style);

type ThirdBlockProps = {
  service_name: SERVICE_NAME,
  header: string
};
type ThirdBlockState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  header: store.systemStore.familiarHeader
}))
@observer
export class ThirdBlock extends React.Component<ThirdBlockProps, ThirdBlockState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    header: ''
  };

  render() {
    const { service_name, header } = this.props;

    return (
      <div className={b(null, { [service_name]: true })}>
        <div className='container g-lg-0'>
          <div className='row g-lg-0'>
            <div className='col-lg-12'>
              <Title size={TITLE_SIZE.SERVICE_PAGE}
                     className={b('header')}>{header}</Title>
            </div>
          </div>

          <div className='row g-lg-0'>
            <div className='col-lg-12'>
              <ul className={b('list')}>
                <li className={b('item')}>Sign up</li>
                <li className={b('item')}>Get familiar with the interface</li>
                <li className={b('item')}>Start learning</li>
                <li className={b('item')}>Study every day</li>
                <li className={b('item')}>You will feel the results in a week</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
