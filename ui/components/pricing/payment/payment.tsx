import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './payment.module.sass';
import { Button, Paragraph } from '../../../common';

const b = block(style);

type PaymentProps = {};
type PaymentState = {};

@inject(() => ({}))
@observer
export class Payment extends React.Component<PaymentProps, PaymentState> {
  render() {
    return (
      <div className={b(null)}>
        <div className='container'>
          <div className='row mb-5'>
            <div className='col-lg-6 d-flex justify-content-center'>
              <Button>Pay by card</Button>
            </div>
            <div className='col-lg-6'>

            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-lg-12'>
              <Paragraph>
                Our program is aimed at making your path to perfection as smooth as possible. Therefore we have
                developed several plans especially for your needs. All you have to do is choose the one eight for you
                and get on board of our SCHOOL program.
              </Paragraph>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12'>
              <Paragraph>
                The MUSICABINET SCHOOL is especially designed for those, looking to start their guitar playing career at
                ease and we are here to be helping you along the way.
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
