import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './first-block.module.sass';
import { RootStore } from '../../../../stores';
import { VideoBackground } from './video-background/video-background';
import { ContentService } from './content-service/content-service';
import ImageBackground from './image-background/image-background';

const b = block(style);

type FirstBlockProps = {
  service_name: string;
  instrument_name: string;
};
type FirstBlockState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.serviceNameLowerCase,
  instrument_name: store.systemStore.instrument_name
}))
@observer
export class FirstBlock extends React.Component<FirstBlockProps, FirstBlockState> {
  static defaultProps = {
    service_name: '',
    instrument_name: ''
  };

  getBackground = () => {
    const { service_name, instrument_name } = this.props;
    const name = `${service_name}-${instrument_name}`;
    if (['school-guitar', 'college-guitar', 'university-guitar'].includes(name)) {
      return (
        <VideoBackground url={name}>
          <ContentService />
        </VideoBackground>
      );
    } else {
      return (
        <ImageBackground instrument={instrument_name}>
          <ContentService />
        </ImageBackground>
      );
    }
  };

  render() {
    return (
      <div className={b(null)}>
        <div className={b('container')}>{this.getBackground()}</div>
      </div>
    );
  }
}
