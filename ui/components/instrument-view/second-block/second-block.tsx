import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './second-block.module.sass';
import { RootStore } from '../../../../stores';
import { SERVICE_NAME, TITLE_SIZE } from '../../../../constants';
import { Title } from '../../../common';

const b = block(style);

type SecondBlockProps = {
  service_name: SERVICE_NAME,
  header: string,
  columns: string[],
  playingImage: string,
  headerPlaying: string,
  textPlaying: string[]
};
type SecondBlockState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  header: store.systemStore.header,
  columns: store.systemStore.columns,
  playingImage: store.systemStore.playingImage,
  headerPlaying: store.systemStore.headerPlaying,
  textPlaying: store.systemStore.textPlaying
}))
@observer
export default class SecondBlock extends React.Component<SecondBlockProps, SecondBlockState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    header: '',
    columns: [],
    playingImage: '',
    headerPlaying: '',
    textPlaying: []
  };

  render() {
    const { header, columns, service_name, playingImage, headerPlaying, textPlaying } = this.props;

    return (
      <div className={b(null)}>
        <div className='container g-lg-0'>
          <div className='row g-lg-0'>
            <div className='col-lg-12'>
              <Title size={TITLE_SIZE.SERVICE_PAGE} isServiceColor>{header}</Title>
            </div>
          </div>


          <div className={b('columns')}>
            <div className='row g-lg-0'>
              {columns.map((column, index) => {
                return (
                  <div key={index} className='col-lg-4'>
                    <div className={b('column', { [service_name]: true })}>{column}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='row g-lg-0'>
            <div className='col-lg-5'>

              <div className={b('playing')}>
                <picture className={b('picture')}>
                  <source
                    srcSet={`/images/playing/${playingImage}.webp, /images/playing/${playingImage}@2x.webp 2x`}
                    type='image/webp' />
                  <img src={`/images/playing/${playingImage}.png`}
                       srcSet={`/images/playing/${playingImage}@2x.png 2x`} />
                </picture>
              </div>

            </div>
            <div className='col-lg-7'>
              <div className={b('content')}>
                <Title size={TITLE_SIZE.SERVICE_PAGE} isServiceColor className={b('header')}>
                  {headerPlaying}
                </Title>

                {textPlaying.map((text, index) => <p key={index} className={b('paragraph')}>{text}</p>)}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
