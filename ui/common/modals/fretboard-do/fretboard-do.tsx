import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ModalsStore, RootStore } from '../../../../stores';
import { MODALS } from '../../../../constants';
import { Modal } from '../../modal/modal';


type FretboardDoProps = {
  modalsStore: ModalsStore
};
type FretboardDoState = {};

@inject((store: RootStore) => ({
  modalsStore: store.modalsStore
}))
@observer
export class FretboardDo extends React.Component<FretboardDoProps, FretboardDoState> {

  static defaultProps = {
    modalsStore: {}
  };

  handleOnClose = () => {
    const { modalsStore } = this.props;
    modalsStore.close(MODALS.FRETBOARD_DO);
  };

  render() {
    const { modalsStore } = this.props;

    return (
      <Modal isOpen={modalsStore.list[MODALS.FRETBOARD_DO]}
             onClose={this.handleOnClose}>
        <img src='/payload/Neck_Notes - Do re mi....png' alt='' />
      </Modal>
    );
  }

}
