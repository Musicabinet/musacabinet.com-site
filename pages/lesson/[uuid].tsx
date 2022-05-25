import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout } from '../../ui';
import { LessonView } from '../../ui/components';
import { CustomAppContext } from '../../interfaces';
import { redirectToWrapper } from '../../core';
import { LessonStore, MetronomeStore, PlayerStore, RootStore, WebsocketStore } from '../../stores';
import { ucFirst } from '../../helpers';
import { SPACE_CONTROL, SPACE_CONTROL_CURRENT } from '../../constants';

type LessonPageProps = {
  playerStore: PlayerStore;
  metronomeStore: MetronomeStore;
  lessonStore: LessonStore,
  websocketStore: WebsocketStore
};
type LessonPageState = {};

@inject((store: RootStore) => ({
  playerStore: store.playerStore,
  metronomeStore: store.metronomeStore,
  lessonStore: store.lessonStore,
  websocketStore: store.websocketStore
}))
@observer
export default class LessonPage extends React.Component<LessonPageProps, LessonPageState> {
  static async getInitialProps({ store, ctx: { res, query } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));
    await store?.lessonStore.get(String(query.uuid));

    const service_name = store?.lessonStore.group_lesson?.collections?.serviceName;
    const service_id = store?.lessonStore.group_lesson?.collections?.service_id;
    const instrument_name = store?.lessonStore.group_lesson?.collections?.instrumentName;
    const instrument_id = store?.lessonStore.group_lesson?.collections?.instrument_id;

    if (service_name && instrument_name) {
      store?.systemStore.setServiceName(service_name);
      store?.systemStore.setServiceId(Number(service_id));
      store?.systemStore.setInstrumentName(instrument_name);
      store?.systemStore.setInstrumentId(Number(instrument_id));
      // @ts-ignore
      store?.systemStore.setInstrumentIcon(instrument_name.toUpperCase());

      // Course id
      if (store?.lessonStore.group_lesson?.collections?.course_id) {
        store?.systemStore.setCourseId(store?.lessonStore.group_lesson?.collections?.course_id);
      }

      // Module id
      if (store?.lessonStore.group_lesson?.collections?.module_id) {
        store?.systemStore.setModuleId(store?.lessonStore.group_lesson?.collections?.module_id);
      }

      // Group lesson id
      if (store?.lessonStore.group_lesson?.id) {
        store?.systemStore.setGroupLessonId(store?.lessonStore.group_lesson?.id);
      }


      store?.playerStore.setFirstLibrary();
      store?.playerStore.loadTrack();

      await store?.lessonStore.getModuleMapping();
    }
    return {
      title: `MC | ${store?.lessonStore.name} ${ucFirst(String(store?.systemStore.service_name))} ${ucFirst(
        String(store?.systemStore.instrument_name)
      )}`,
      description: '',
      keywords: ''
    };
  }

  static defaultProps = {
    playerStore: {},
    metronomeStore: {},
    lessonStore: {},
    websocketStore: {}
  };

  async componentDidMount() {
    this.handleSpaceKey();

    const { lessonStore, playerStore, websocketStore } = this.props;
    playerStore.setFirstLibrary();
    playerStore.loadTrack();
    await websocketStore.init();
    websocketStore.sendMessage({ uuid: lessonStore.uuid });
  }

  handleSpaceKey = () => {
    const { playerStore, metronomeStore } = this.props;

    document.body.onkeydown = function(event) {
      if (event.keyCode === 32) {
        event.preventDefault();

        const currentSpaceKeyControl = localStorage.getItem(SPACE_CONTROL_CURRENT) ?? SPACE_CONTROL_CURRENT;

        if (SPACE_CONTROL.PLAYER === currentSpaceKeyControl) {
          if (playerStore.is_playing) {
            playerStore.onStop();
          } else {
            playerStore.onPlay();
          }
        } else if (SPACE_CONTROL.METRONOME === currentSpaceKeyControl) {
          if (metronomeStore.isPlay) {
            metronomeStore.onStop();
          } else {
            metronomeStore.onStart();
          }
        } else {
          console.warn(`Not selected control key : SPACE_CONTROL_CURRENT`);
        }
      }
    };
  };

  componentDidUpdate(prevProps: LessonPageProps) {
    const { lessonStore } = this.props;

    if (!lessonStore.isFetch) {
      const { playerStore } = this.props;
      playerStore.setFirstLibrary();
      playerStore.loadTrack();
    }

    const { websocketStore } = this.props;
    if (prevProps.lessonStore.uuid !== lessonStore.uuid) {
      // Устанавливаем трек
      websocketStore.sendMessage({
        uuid: lessonStore.uuid
      });
    }
  }

  async componentWillUnmount() {
    const { websocketStore } = this.props;
    await websocketStore.disconnect();
  }

  render() {
    return (
      <BaseLayout full noStick>
        <LessonView />
      </BaseLayout>
    );
  }
}
