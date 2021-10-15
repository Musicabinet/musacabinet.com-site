import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './video.module.sass';

const b = block(style);

type VideoProps = {};
type VideoState = {
  isPlay: boolean
};

@inject(() => ({}))
@observer
export class Video extends React.Component<VideoProps, VideoState> {

  public videoRef = React.createRef<HTMLVideoElement>();

  state = {
    isPlay: false
  };

  componentDidMount() {
  }

  handleOnClick = () => {
    const videoRef = this.videoRef;
    const { isPlay } = this.state;

    if (videoRef.current) {

      if (isPlay) {
        this.setState(() => ({ isPlay: false }), () => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      } else {
        this.setState(() => ({ isPlay: true }), () => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        });
      }

    }
  };

  render() {
    return (
      <div className={b(null)}>
        <video ref={this.videoRef} controls={false} preload={'metadata'}
               onClick={this.handleOnClick}
               poster={'/images/video-preview/video-preview@2x.png'}>
          <source src='/video/muscabinet.com.mp4' type='video/mp4' />
        </video>
      </div>
    );
  }
}
