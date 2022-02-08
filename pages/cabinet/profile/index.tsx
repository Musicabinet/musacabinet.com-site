import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, CabinetLayout } from '../../../ui';
import { ProfileUser } from '../../../ui/components';
import { CustomAppContext } from '../../../interfaces';
import { redirectToWrapper } from '../../../core';

type ProfilePageProps = {};
type ProfilePageState = {};

@inject(() => ({}))
@observer
export default class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
  static async getInitialProps({ store, ctx: { res } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));


    return {
      title: 'MC | Profile Settings',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout noStick background={'gray'}>
        <CabinetLayout>
          <ProfileUser />
        </CabinetLayout>
      </BaseLayout>
    );
  }
}
