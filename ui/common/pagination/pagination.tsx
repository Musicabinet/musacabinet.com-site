import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './pagination.module.sass';
import { LessonStore, RootStore, SystemStore } from '../../../stores';

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

  handleOnClick = (score_number: number) => {
    const { lessonStore } = this.props;
    lessonStore.setCurrentScore(score_number);
  };

  generate = () => {
    const { lessonStore } = this.props;
    let pagination: React.ReactNode[] = [];


    for (let i = 0; i < lessonStore.scoresTotal; i++) {
      pagination.push(<button className={b('btn', { active: i === lessonStore.currentScore })}
                              onClick={() => this.handleOnClick(i)}>{i + 1}</button>);
    }

    return pagination;
  };

  render() {
    const { lessonStore, systemStore } = this.props;

    return (
      <div className={b(null, {
        [systemStore.service_name]: true,
        hidden: lessonStore.scoresTotal < 2
      })}>
        {this.generate()}
      </div>
    );
  }
}
