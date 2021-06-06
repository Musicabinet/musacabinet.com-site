import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './payment.module.sass';
import { Button, Paragraph } from '../../../common';
import { PayPalButton } from './paypal-button/paypal-button';
import { RootStore } from '../../../../stores';
import { SERVICE_NAME } from '../../../../constants';
import { ucFirst } from '../../../../helpers';

const b = block(style);

type PaymentProps = {
  service_name: SERVICE_NAME,
  instrument: string
};
type PaymentState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  instrument: store.pricingStore.selected_instrument
}))
@observer
export class Payment extends React.Component<PaymentProps, PaymentState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    instrument: ''
  };

  render() {
    const { service_name, instrument } = this.props;

    return (
      <div className={b(null)}>
        <div className='container'>
          <div className='row mb-5'>
            <div className='col-lg-6 d-flex justify-content-center align-items-start'>
              <Button full className={b('btn-by-card')}>Pay by card</Button>
            </div>
            <div className='col-lg-6'>
              <PayPalButton />
            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-lg-12'>
              <Paragraph>
                Our program is aimed at making your path to perfection as smooth as possible.
              </Paragraph>
            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-lg-12'>
              <Paragraph>
                All you have to do is choose the one right for you and get on board of
                our {ucFirst(instrument)} | {ucFirst(service_name)} program.
              </Paragraph>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12'>
              <Paragraph>
                The MUSICABINET | {ucFirst(instrument)} | {ucFirst(service_name)} is especially designed for those,
                looking to start their guitar playing career at ease and we are here to be helping you along the way.
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
