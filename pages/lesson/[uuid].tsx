import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout } from '../../ui';
import { LessonView } from '../../ui/components';
import { CustomAppContext } from '../../interfaces';
import { redirectToWrapper } from '../../core';
import { RootStore } from '../../stores';

type LessonPageProps = {
  uuid: string,
  isFetch: boolean,
  onLoadTrack: () => void,
  onSetFirstLibrary: () => void,
  onInitWebSocket: () => Promise<void>,
  onSendMessageWebSocket: (data: {}) => void,
  onDisconnectWebSocket: () => void
};
type LessonPageState = {};

@inject((store: RootStore) => ({
  uuid: store.lessonStore.uuid,
  isFetch: store.lessonStore.isFetch,
  onLoadTrack: store.playerStore.loadTrack,
  onSetFirstLibrary: store.playerStore.setFirstLibrary,
  onInitWebSocket: store.websocketStore.init,
  onSendMessageWebSocket: store.websocketStore.sendMessage,
  onDisconnectWebSocket: store.websocketStore.disconnect
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

      await store?.lessonStore.getModuleMapping();
    }
    return {};
  }

  static defaultProps = {
    uuid: '',
    isFetch: false,
    onInitWebSocket: () => console.log('Not set handler'),
    onSendMessageWebSocket: () => console.log('Not set handler'),
    onDisconnectWebSocket: () => console.log('Not set handler')
  };

  async componentDidMount() {
    const { uuid, onLoadTrack, onSetFirstLibrary, onInitWebSocket, onSendMessageWebSocket } = this.props;
    onSetFirstLibrary();
    onLoadTrack();
    await onInitWebSocket();
    onSendMessageWebSocket({ uuid });
  }

  componentDidUpdate(prevProps: LessonPageProps) {
    if (!this.props.isFetch) {
      const { onLoadTrack, onSetFirstLibrary } = this.props;
      onSetFirstLibrary();
      onLoadTrack();
    }

    const { uuid, onSendMessageWebSocket } = this.props;
    if (prevProps.uuid !== uuid) {
      // Устанавливаем трек
      onSendMessageWebSocket({
        uuid
      });
    }
  }

  componentWillUnmount() {
    const { onDisconnectWebSocket } = this.props;
    onDisconnectWebSocket();
  }

  render() {
    return (
      <BaseLayout full noStick>
        <LessonView />
      </BaseLayout>
    );
  }
}
