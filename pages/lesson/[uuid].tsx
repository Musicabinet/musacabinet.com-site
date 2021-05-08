import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout } from '../../ui';
import { LessonView } from '../../ui/components';
import { CustomAppContext } from '../../interfaces';
import { redirectToWrapper } from '../../core';
import { RootStore } from '../../stores';

type LessonPageProps = {
  onLoadTrack: () => void,
  onSetFirstLibrary: () => void
};
type LessonPageState = {};

@inject((store: RootStore) => ({
  onLoadTrack: store.playerStore.loadTrack,
  onSetFirstLibrary: store.playerStore.setFirstLibrary
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

      await store?.lessonStore.getModuleMapping();
    }
    return {};
  }

  componentDidMount() {
    const { onLoadTrack, onSetFirstLibrary } = this.props;
    onSetFirstLibrary();
    onLoadTrack();
  }

  render() {
    return (
      <BaseLayout full noStick>
        <LessonView />
      </BaseLayout>
    );
  }
}
