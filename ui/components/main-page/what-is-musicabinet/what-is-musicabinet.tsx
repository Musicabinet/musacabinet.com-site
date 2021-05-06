import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './what-is-musicabinet.module.sass';
import { Paragraph, Title } from '../../../common';
import { TITLE_SIZE } from '../../../../constants';
import { BlockContent } from './block-content/block-content';
import { LIST_ICON } from '../../../common/icons';
import { Video } from './video/video';
import { InstrumentList } from './instrument-list/instrument-list';
import { ServiceList } from './service-list/service-list';

const b = block(style);

type WhatIsMusicabinetProps = {};
type WhatIsMusicabinetState = {};

@inject(() => ({}))
@observer
export class WhatIsMusicabinet extends React.Component<WhatIsMusicabinetProps, WhatIsMusicabinetState> {
  render() {
    return (
      <div className={b(null)}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 mb50'>
              <Title size={TITLE_SIZE.SECOND} className={'text-center'}>What is MUSICABINET?</Title>
            </div>


            <div className='row'>
              <div className='col-lg-6 offset-lg-3'>
                <Paragraph className={'text-center'}>
                  We are here to offer you the most convenient & comfortable music education
                </Paragraph>
              </div>
            </div>

            <div className='row g-lg-0'>
              <div className='col-lg-4'>
                <BlockContent title={'Choose'}
                              icon={LIST_ICON.STEP_1}
                              description={'Select the instrument & level of education you want'} />
              </div>
              <div className='col-lg-4'>
                <BlockContent title={'Start'}
                              icon={LIST_ICON.STEP_2}
                              fix
                              description={'Starting your professional music training is easy as 1, 2, 3'} />
              </div>
              <div className='col-lg-4'>
                <BlockContent title={'Play'}
                              icon={LIST_ICON.STEP_3}
                              description={'At the end of each lesson, each course, each module, each program your playing skills will take a tremedeous step up'} />
              </div>
            </div>

            <div className='row g-0'>
              <div className='col-12 g-lg-0'>
                <Video />
              </div>
            </div>

            <ServiceList />

            <InstrumentList />
          </div>
        </div>
      </div>
    );
  }
}
