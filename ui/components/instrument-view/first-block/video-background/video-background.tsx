import * as React from 'react';
import block from 'bem-css-modules';
import style from './video-background.module.sass';

const b = block(style);

type VideoBackgroundProps = {
  url: string
};
type VideoBackgroundState = {};

export class VideoBackground extends React.Component<VideoBackgroundProps, VideoBackgroundState> {
  render() {
    const { url, children } = this.props;
    return <div className={b(null)}>
      <video key={url}
             autoPlay
             loop
             muted
             poster={`/video-instruments/${url}.jpg`}
             className={b('player')}>
        <source src={`/video-instruments/${url}.mp4`} type='video/mp4' />
        <source src={`/video-instruments/${url}.webm`} type='video/webm' />
        <source src={`/video-instruments/${url}.ogv`} type='video/ogg' />
      </video>
      <div className={b('pattern')} />
      {children}
    </div>;
  }
}
