import * as React from 'react';
import {inject, observer} from 'mobx-react';
import block from 'bem-css-modules';
import style from "./video.module.sass";

const b = block(style);

type VideoProps = {};
type VideoState = {};

@inject(() => ({}))
@observer
export class Video extends React.Component<VideoProps, VideoState> {
  render() {
    return (
      <div className={b(null)}>
        <video controls preload={'metadata'} poster={'/images/video-preview/video-preview@2x.png'}>
          <source src="/video/muscabinet.com.mp4" type="video/mp4"/>
        </video>
      </div>
    );
  }
}
