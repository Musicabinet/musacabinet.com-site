import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SignUpModal } from '../../ui/common/modals/sign-up/sign-up';
import { ModalsStore, RootStore } from '../../stores';
import { MODALS } from '../../constants';

type IFramePageProps = {
  modalsStore: ModalsStore
};
type IFramePageState = {};

@inject((store: RootStore) => ({
  modalsStore: store.modalsStore
}))
@observer
export default class IFramePage extends React.Component<IFramePageProps, IFramePageState> {

  componentDidMount() {
    const { modalsStore } = this.props;
    modalsStore.show(MODALS.SIGN_UP)
  }

  render() {
    return (
      <SignUpModal />
    );
  }
}
