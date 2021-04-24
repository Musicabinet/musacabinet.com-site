import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout } from '../../ui';
import { LessonView } from '../../ui/components';
import { CustomAppContext } from '../../interfaces';
import { redirectToWrapper } from '../../core';

type LessonPageProps = {};
type LessonPageState = {};

@inject(() => ({}))
@observer
export default class LessonPage extends React.Component<LessonPageProps, LessonPageState> {

  static async getInitialProps({ store, router, ctx: { res } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));
    await store?.lessonStore.get(String(router.query.uuid));

    console.log(store?.lessonStore.group_lesson)
    return {};
  }

  render() {
    return (
      <BaseLayout full>
        <LessonView />
      </BaseLayout>
    );
  }
}
