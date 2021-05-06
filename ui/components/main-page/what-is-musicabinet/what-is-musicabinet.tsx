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
                <BlockContent title={'Choose'}
                              icon={LIST_ICON.STEP_2}
                              fix
                              description={'Select the instrument & level of education you want'} />
              </div>
              <div className='col-lg-4'>
                <BlockContent title={'Choose'}
                              icon={LIST_ICON.STEP_3}
                              description={'Select the instrument & level of education you want'} />
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <Video />
              </div>
            </div>

            <InstrumentList/>
          </div>
        </div>
      </div>
    );
  }
}
