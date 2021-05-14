import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './sixth-block.module.sass';
import { RootStore } from '../../../../stores';
import { SERVICE_NAME, TITLE_SIZE } from '../../../../constants';
import { Paragraph, Title } from '../../../common';

const b = block(style);

type SixthBlockProps = {
  service_name: SERVICE_NAME,
  imagePath: string
};
type SixthBlockState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  imagePath: store.systemStore.gadgetImage
}))
@observer
export class SixthBlock extends React.Component<SixthBlockProps, SixthBlockState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    imagePath: ''
  };

  render() {
    const { service_name, imagePath } = this.props;

    return (
      <div className={b(null, { [service_name]: true })}>
        <div className='container g-lg-0'>
          <div className='row g-lg-0'>
            <div className='col-lg-5'>
              <Title className={b('header')} size={TITLE_SIZE.SERVICE_PAGE}>Wherever and whenever</Title>
            </div>
          </div>

          <div className='row g-lg-0'>
            <div className='col-lg-7'>
              <Paragraph className={b('description')}>
                Study at home or while traveling from your computer, tablet or smartphone.
              </Paragraph>
            </div>
            <div className='col-lg-12'>
              <picture className={b('picture')}>
                <source
                  srcSet={`${imagePath}.webp, ${imagePath}@2x.webp 2x`}
                  type="image/webp"/>
                <img src={`${imagePath}.png`} srcSet={`${imagePath}@2x.png 2x`} alt=""/>
              </picture>
            </div>
            <div className='col-lg-8 offset-lg-2 text-center'>
              <Title size={TITLE_SIZE.SERVICE_PAGE} className={b('title')}>Join us, if you're serious about education</Title>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
