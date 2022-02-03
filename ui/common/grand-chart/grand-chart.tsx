import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './grand-chart.module.sass';
import { GrandChartStore, ModalsStore, RootStore } from '../../../stores';
import { handleDetectClick } from '../../../helpers';
import { MODALS } from '../../../constants';
import { Header } from './header/header';
import { Courses } from './courses/courses';
import { GroupLessons } from './group-lessons/group-lessons';

const b = block(style);

type GrandChartProps = {
  modalsStore: ModalsStore,
  grandChartStore: GrandChartStore
};
type GrandChartState = {};

@inject((store: RootStore) => ({
  modalsStore: store.modalsStore,
  grandChartStore: store.grandChartStore
}))
@observer
export class GrandChart extends React.Component<GrandChartProps, GrandChartState> {

  public containerModalRef = React.createRef<HTMLDivElement>();

  static defaultProps = {
    modalsStore: {},
    grandChartStore: {}
  };

  componentDidMount() {
    const { grandChartStore } = this.props;
    grandChartStore.setIsShowGoldLine(true);

    setTimeout(() => {
      document.addEventListener('click', this.handleClickOutside);
    }, 100);
  }

  componentWillUnmount() {
    const { grandChartStore } = this.props;
    grandChartStore.setIsShowGoldLine(false);

    setTimeout(() => {
      document.removeEventListener('click', this.handleClickOutside);
    }, 100);
  }

  handleClickOutside = (e: MouseEvent) => {
    const { modalsStore } = this.props;
    handleDetectClick(this.containerModalRef, () => modalsStore.close(MODALS.GRAND_CHART), e);
  };

  render() {
    const { grandChartStore } = this.props;
    return (
      <div className={b(null)}
           ref={this.containerModalRef}>
        <Header />
        <div className={b('container')}>
          <Courses />
          <GroupLessons />
        </div>
        <div className={b('gold-line', { show: grandChartStore.isShowGoldLine && !grandChartStore.isFetch })} />
      </div>
    );
  }
}
