import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './pricing.module.sass';
import { Instruments } from './instruments/instruments';
import { InstrumentsName } from './instruments-name/instruments-name';
import { Types } from './types/types';
import { List } from './list/list';

const b = block(style);

type PricingProps = {};
type PricingState = {};

@inject(() => ({}))
@observer
export class Pricing extends React.Component<PricingProps, PricingState> {
  render() {
    return (
      <div className={b(null)}>
        <Instruments />
        <InstrumentsName />
        <Types />
        <List />

        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className={b('text')}>
                <p>Our program aims to make your path to perfection as smooth as possible.</p>
                <p>All you have to do is choose the instrument and the level right for you and get on board with our
                  innovative education system.</p>
                <p>MUSICABINET is specially designed for those looking to start, continue, or perfect their music career and
                  music instruments playing skills at ease.</p>
                <p>MUSICABINET is a Strong Education System containing over 200 000 handmade sheets of Learning Materials.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
