import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './method.module.sass';
import { RootStore } from '../../../../stores';
import { ScoreI } from '../../../../interfaces';

const b = block(style);

type MethodProps = {
  uuid: string,
  currentContentScore: ScoreI | null,
  video_iframe: string | null,
  onGetVideo: (id_video: number) => void
};
type MethodState = {};

@inject((store: RootStore) => ({
  uuid: store.lessonStore.uuid,
  currentContentScore: store.lessonStore.currentContentScore,
  video_iframe: store.lessonStore.video_iframe,
  onGetVideo: store.lessonStore.getVideo
}))
@observer
export class Method extends React.Component<MethodProps, MethodState> {

  static defaultProps = {
    uuid: '',
    video_iframe: null,
    currentContentScore: null,
    onGetVideo: () => console.log("Not set handler")
  };

  componentDidMount() {
    const { currentContentScore, onGetVideo } = this.props;

    if (currentContentScore) {
      onGetVideo(Number(currentContentScore.video_url.replace(/\D/g, '')));
    }
  }

  componentDidUpdate(prevProps: MethodProps) {
    if (
      prevProps.uuid !== this.props.uuid
    ) {
      const { onGetVideo } = this.props;
      if (this.props.currentContentScore) {
        onGetVideo(Number(this.props.currentContentScore.video_url.replace(/\D/g, '')));
      }
    }
  }

  render() {
    const { currentContentScore, video_iframe } = this.props;

    return (
      <>
        {(video_iframe && (
          <div className={`${b(null)} embed-container`}
               dangerouslySetInnerHTML={{ __html: video_iframe }} />
        ))}

        {(currentContentScore && (
          <>
            <div className={b('content')} dangerouslySetInnerHTML={{ __html: currentContentScore.content }} />
          </>
        ))}
      </>
    );
  }
}
