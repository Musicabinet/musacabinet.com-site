import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './fifth-block.module.sass';
import { Paragraph, Title } from '../../../common';
import { TITLE_SIZE } from '../../../../constants';

const b = block(style);

type FifthBlockProps = {};
type FifthBlockState = {};

@inject(() => ({}))
@observer
export class FifthBlock extends React.Component<FifthBlockProps, FifthBlockState> {
  render() {
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
      </div>
    );
  }
}
