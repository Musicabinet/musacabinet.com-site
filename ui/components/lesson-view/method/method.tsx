import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './method.module.sass';
import { LessonStore, RootStore, SystemStore } from '../../../../stores';
import { SERVICE_NAME } from '../../../../constants';
import { Scores } from '../scores/scores';
import { handleDetectClick } from '../../../../helpers';

const b = block(style);

type MethodProps = {
  systemStore: SystemStore,
  lessonStore: LessonStore,
};
type MethodState = {
  isNotes: boolean;
  isShowExtra: boolean;
};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  lessonStore: store.lessonStore
}))
@observer
export class Method extends React.Component<MethodProps, MethodState> {

  public extraListRef = React.createRef<HTMLButtonElement>();

  state = {
    isNotes: false,
    isShowExtra: false
  };

  static defaultProps = {
    systemStore: {},
    lessonStore: {}
  };

  async componentDidMount() {
    const { lessonStore } = this.props;

    document.addEventListener('click', this.handleClickOutside);

    if (lessonStore.currentContentScore) {
      await lessonStore.getVideo(Number(lessonStore.currentContentScore.video_url.replace(/\D/g, '')));
    }
  }

  async componentDidUpdate(prevProps: MethodProps) {
    const { lessonStore } = this.props;

    if (prevProps.lessonStore.uuid !== lessonStore.uuid) {
      if (lessonStore.currentContentScore) {
        await lessonStore.getVideo(Number(lessonStore.currentContentScore.video_url.replace(/\D/g, '')));
      }
    }

    if (lessonStore.currentContentScore?.id !== prevProps.lessonStore.currentContentScore?.id) {
      await lessonStore.getVideo(Number(lessonStore.currentContentScore?.video_url.replace(/\D/g, '')));
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (e: MouseEvent) => {
    const {isShowExtra} = this.state;
    if(isShowExtra){
      handleDetectClick(this.extraListRef, this.handleOnCloseExtra, e);
    }
  };

  handleOnChangeNotes = () => this.setState((state) => ({ isNotes: !state.isNotes }));

  handleOnShowExtra = () => this.setState(() => ({ isShowExtra: true }));

  handleOnCloseExtra = () => this.setState(() => ({ isShowExtra: false }));

  render() {
    const { lessonStore, systemStore } = this.props;
    const { isNotes, isShowExtra } = this.state;

    return (
      <>
        <div className={b('head', { [systemStore.service_name]: true, isNotes })}>

          <button ref={this.extraListRef}
                  className={b('extra', { [systemStore.service_name]: true })}
                  onClick={this.handleOnShowExtra}>
            <span />
            <span />
            <span />

            <ul className={b('dropdown', {
                  [systemStore.service_name]: true,
                  show: isShowExtra
                })}>
              <li>
                <button>Circle od Fifths</button>
              </li>
              <li>
                <button>Fretboard (A B C ...)</button>
              </li>
              <li>
                <button>Fretboard (do re mi ...)</button>
              </li>
            </ul>
          </button>



          {systemStore.service_name === SERVICE_NAME.COLLEGE && systemStore.instrument_name !== '' && systemStore.instrument_name == 'Guitar' && (
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

        {!isNotes && lessonStore.video_iframe && lessonStore.currentContentScore?.video_url && (
          <div className={`${b(null)} embed-container`}
               dangerouslySetInnerHTML={{ __html: lessonStore.video_iframe || '' }} />
        )}

        {!isNotes && lessonStore.currentContentScore && (
          <>
            <div className={b('content')}
                 dangerouslySetInnerHTML={{ __html: lessonStore.currentContentScore.content }} />
          </>
        )}

        {isNotes && <Scores />}
      </>
    );
  }

}
