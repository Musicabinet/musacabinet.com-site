import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { LessonStore, RootStore } from '../../../../../../stores';
import Router from 'next/router';
import { Item } from './item';

const b = block(style);

type ListProps = {
  lessonStore: LessonStore,
  show: boolean;
  onCloseList: () => void;
};
type ListState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore
}))
@observer
export class List extends React.Component<ListProps, ListState> {

  static defaultProps = {
    lessonStore: {}
  };

  handleOnLink = async (uuid: string) => {
    const { onCloseList } = this.props;
    await Router.push(`/lesson/[uuid]`, `/lesson/${uuid}`);
    onCloseList();
  };

  render() {
    const { lessonStore, show } = this.props;

    return (
      <div className={b(null, { show })}>
        {lessonStore.lesson_list.map((lessonListItem) => {
          return (
            <Item
              key={lessonListItem.id}
              active={lessonStore.uuid === lessonListItem.uuid}
              lessonListItem={lessonListItem}
              onLink={this.handleOnLink}
            />
          );
        })}
      </div>
    );
  }
}
