import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { MODALS } from '../../../../constants';
import { GrandChart } from '../../grand-chart/grand-chart';

type GrandChartModalProps = {
  is_show: boolean;
  onCloseModal: (id_modal: MODALS) => void;
};
type GrandChartModalState = {};

@inject((store: RootStore) => ({
  is_show: store.modalsStore.list[MODALS.GRAND_CHART],
  onCloseModal: store.modalsStore.close
}))
@observer
export class GrandChartModal extends React.Component<GrandChartModalProps, GrandChartModalState> {
  static defaultProps = {
    is_show: false,
    onCloseModal: () => console.log('Not set handler')
  };

  handleOnClose = () => {
    const { onCloseModal } = this.props;
    onCloseModal(MODALS.GRAND_CHART);
  };

  render() {
    const { is_show } = this.props;
    return (
      <Modal isOpen={is_show} size={'large'} onClose={this.handleOnClose}>
       <GrandChart />
      </Modal>
    );
  }
}
