import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './pagination.module.sass';
import { RootStore } from '../../../../../stores';

const b = block(style);

type PaginationProps = {
  current_list: number,
  total_list: number,
  onChangeList: (value: number) => void,
};
type PaginationState = {};

@inject((store: RootStore) => ({
  current_list: store.lessonStore.currentScore,
  total_list: store.lessonStore.scoresTotal,
  onChangeList: store.lessonStore.setCurrentScore
}))
@observer
export class Pagination extends React.Component<PaginationProps, PaginationState> {

  static defaultProps = {
    current_list: 0,
    total_list: 0,
    onChangeList: () => console.log('Not set handler')
  };

  handleNextPage = () => {
    const { current_list, onChangeList } = this.props;
    onChangeList(current_list + 1);
  };

  handlePrevPage = () => {
    const { current_list, onChangeList } = this.props;
    onChangeList(current_list - 1);
  };

  render() {
    const { current_list, total_list } = this.props;

    return (
      <div className={b(null, {
        hidden: total_list < 2
      })}>
        <button onClick={this.handlePrevPage}
                className={b('btn', { left: true })}/>
        <div className={b('current')}>{current_list + 1} of {total_list}</div>
        <button onClick={this.handleNextPage}
                className={b('btn', { right: true })}/>
      </div>
    );
  }
}
