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
  systemStore: SystemStore
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

  handleOnClick = (score_number: number) => {
    const { lessonStore } = this.props;

    if(score_number === -1 || score_number > lessonStore.scoresTotal){
      return false;
    }

    lessonStore.setCurrentScore(score_number);
  };

  generate = () => {
    const { lessonStore } = this.props;
    let pagination: React.ReactNode[] = [];


    for (let i = 0; i < lessonStore.scoresTotal; i++) {
      pagination.push(<button key={i}
                              className={b('btn', { active: i === lessonStore.currentScore })}
                              onClick={() => this.handleOnClick(i)}>{i + 1}</button>);
    }

    return pagination;
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
    const { lessonStore, systemStore } = this.props;
    const currentPage = lessonStore.currentScore + 1;


    return (
      <div className={b(null, {
        [systemStore.service_name]: true,
        hidden: lessonStore.scoresTotal < 2
      })}>
        <PaginationRC current={currentPage}
                      total={lessonStore.scoresTotal}
                      itemRender={this.itemRender}
                      pageSize={1}
                      className={`${systemStore.service_name}`} />
      </div>
    );
  }
}
