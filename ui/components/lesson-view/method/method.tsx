import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './method.module.sass';
import { RootStore } from '../../../../stores';
import { ScoreI } from '../../../../interfaces';
import { SERVICE_NAME } from '../../../../constants';
import { Scores } from '../scores/scores';

const b = block(style);

type MethodProps = {
  service_name: SERVICE_NAME;
  instrument_name: '';
  uuid: string;
  currentContentScore: ScoreI | null;
  video_iframe: string | null;
  onGetVideo: (id_video: number) => void;
};
type MethodState = {
  isNotes: boolean;
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  instrument_name: store.systemStore.instrument_name,
  uuid: store.lessonStore.uuid,
  currentContentScore: store.lessonStore.currentContentScore,
  video_iframe: store.lessonStore.video_iframe,
  onGetVideo: store.lessonStore.getVideo
}))
@observer
export class Method extends React.Component<MethodProps, MethodState> {
  state = {
    isNotes: false
  };

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    instrument_name: '',
    uuid: '',
    video_iframe: null,
    currentContentScore: null,
    onGetVideo: () => console.log('Not set handler')
  };

  componentDidMount() {
    const { currentContentScore, onGetVideo } = this.props;

    if (currentContentScore) {
      onGetVideo(Number(currentContentScore.video_url.replace(/\D/g, '')));
    }
  }

  componentDidUpdate(prevProps: MethodProps) {
    const { onGetVideo } = this.props;

    if (prevProps.uuid !== this.props.uuid) {
      if (this.props.currentContentScore) {
        onGetVideo(Number(this.props.currentContentScore.video_url.replace(/\D/g, '')));
      }
    }

    if (this.props.currentContentScore?.id !== prevProps.currentContentScore?.id) {
      onGetVideo(Number(this.props.currentContentScore?.video_url.replace(/\D/g, '')));
    }
  }

  handleOnChangeNotes = () => this.setState((state) => ({ isNotes: !state.isNotes }));

  render() {
    const { currentContentScore, video_iframe, service_name, instrument_name } = this.props;
    const { isNotes } = this.state;

    return (
      <>
        <div className={b('head', {[service_name]: true, isNotes})}>
          {service_name === SERVICE_NAME.COLLEGE && instrument_name !== '' && instrument_name == 'Guitar' && (
            <div className={b('control')}>
              Method
              <div onClick={this.handleOnChangeNotes}
                   className={b('switcher')}>
                <div className={b('checked', { isNotes })} />
              </div>
              Notes
            </div>
          )}
        </div>

        {/*<div className={b('header', { [service_name]: true })}>
          <ButtonBurger active onClick={() => ({})} />
          <span className={b('header-text')}>Method</span>
          {service_name === SERVICE_NAME.COLLEGE && instrument_name !== '' && instrument_name == 'Guitar' && (
            <>
              <Switcher checked={isNotes} onChange={this.handleOnChangeNotes} />
              <span className={b('header-text')}>Notes</span>
            </>
          )}
        </div>*/}

        {!isNotes && video_iframe && currentContentScore?.video_url && (
          <div className={`${b(null)} embed-container`} dangerouslySetInnerHTML={{ __html: video_iframe }} />
        )}

        {!isNotes && currentContentScore && (
          <>
            <div className={b('content')} dangerouslySetInnerHTML={{ __html: currentContentScore.content }} />
          </>
        )}

        {isNotes && <Scores />}
      </>
    );
  }

}
