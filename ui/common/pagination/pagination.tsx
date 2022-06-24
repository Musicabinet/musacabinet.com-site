import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './pagination.module.sass';
import { LessonStore, RootStore, SystemStore } from '../../../stores';
import PaginationRC from 'rc-pagination';
import { getIcon, LIST_ICON } from '../icons';

const b = block(style);

type PaginationProps = {
  lessonStore: LessonStore,
  systemStore: SystemStore,
  type: 'scores' | 'charts'
};
type PaginationState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore,
  systemStore: store.systemStore
}))
@observer
export class Pagination extends React.Component<PaginationProps, PaginationState> {

  static defaultProps = {
    lessonStore: {},
    systemStore: {}
  };

  handleOnClick = (page_number: number) => {
    const { lessonStore, type } = this.props;

    if(type === 'scores'){
      if(page_number === -1 || page_number > lessonStore.scoresTotal){
        return false;
      }

      lessonStore.setCurrentScore(page_number);
    }

    if(type === 'charts'){
      if(page_number === -1 || page_number > lessonStore.chartsTotal){
        return false;
      }

      lessonStore.setCurrentChart(page_number);
    }


  };

  itemRender = (current: number, type: string, element: React.ReactNode): React.ReactNode => {

    const newPage = current - 1;

    if (type === 'prev') {
      return <a data-page-prev={true}
                onClick={() => this.handleOnClick(newPage)}>{getIcon(LIST_ICON.ARROW_LEFT, '')}</a>;
    }
    if (type === 'next') {
      return <a data-page-next={true}
                onClick={() => this.handleOnClick(newPage)}>{getIcon(LIST_ICON.ARROW_RIGHT, '')}</a>;
    }

    if (type === 'page') {
      return <a data-page-link={true} onClick={() => this.handleOnClick(newPage)}>{current}</a>;
    }

    return element;
  };

  render() {
    const { lessonStore, systemStore, type } = this.props;
    let currentPage = 0;
    let totalPages = 0


    if(type === 'scores'){
      totalPages = lessonStore.scoresTotal;
      currentPage = lessonStore.currentScore + 1;
    }else if(type === 'charts'){
      totalPages = lessonStore.chartsTotal;
      currentPage = lessonStore.currentChart + 1;
    }

    return (
      <div className={b(null, {
        [systemStore.service_name]: true,
        hidden: totalPages < 2
      })}>
        <PaginationRC current={currentPage}
                      total={totalPages}
                      itemRender={this.itemRender}
                      pageSize={1}
                      className={`${systemStore.service_name}`} />
      </div>
    );
  }
}
