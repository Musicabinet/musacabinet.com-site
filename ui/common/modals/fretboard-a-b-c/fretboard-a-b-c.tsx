import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ModalsStore, RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { MODALS } from '../../../../constants';

type FretboardABCProps = {
  modalsStore: ModalsStore
};
type FretboardABCState = {};

@inject((store: RootStore) => ({
  modalsStore: store.modalsStore
}))
@observer
export class FretboardABC extends React.Component<FretboardABCProps, FretboardABCState> {

  static defaultProps = {
    modalsStore: {}
  };

  handleOnClose = () => {
    const { modalsStore } = this.props;
    modalsStore.close(MODALS.FRETBOARD_A_B_C);
  };

  render() {
    const { modalsStore } = this.props;

    return (
      <Modal isOpen={modalsStore.list[MODALS.FRETBOARD_A_B_C]}
             onClose={this.handleOnClose}>
        <img className='image-adaptive' src='/payload/Neck_Letters - Chords.png' alt='' />
      </Modal>
    );
  }
}
