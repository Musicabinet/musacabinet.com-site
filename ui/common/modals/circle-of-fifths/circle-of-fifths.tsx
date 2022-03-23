import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ModalsStore, RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { MODALS } from '../../../../constants';

type CircleOfFifthsModalProps = {
  modalsStore: ModalsStore
};
type CircleOfFifthsModalState = {};

@inject((store: RootStore) => ({
  modalsStore: store.modalsStore
}))
@observer
export class CircleOfFifthsModal extends React.Component<CircleOfFifthsModalProps, CircleOfFifthsModalState> {

  static defaultProps = {
    modalsStore: {}
  };

  handleOnClose = () => {
    const { modalsStore } = this.props;
    modalsStore.close(MODALS.CIRCLE_OF_FIFTHS);
  };

  render() {
    const { modalsStore } = this.props;

    return (
      <Modal isOpen={modalsStore.list[MODALS.CIRCLE_OF_FIFTHS]}
             onClose={this.handleOnClose}>
        <img className='image-adaptive' src='/payload/CircleOfFifths.png' alt='' />
      </Modal>
    );
  }
}

