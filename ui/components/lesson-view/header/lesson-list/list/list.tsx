import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { RootStore } from '../../../../../../stores';
import Router from 'next/router';
import { LessonListI } from '../../../../../../interfaces';
import { Item } from './item';

const b = block(style);

type ListProps = {
  show: boolean,
  current_uuid: string,
  list: LessonListI[],
  onCloseList: () => void
};
type ListState = {};

@inject((store: RootStore) => ({
  current_uuid: store.lessonStore.uuid,
  list: store.lessonStore.lesson_list
}))
@observer
export class List extends React.Component<ListProps, ListState> {

  static defaultProps = {
    current_uuid: '',
    list: []
  };

  handleOnLink = async (uuid: string) => {
    const { onCloseList } = this.props;
    await Router.push(`/lesson/[uuid]`, `/lesson/${uuid}`);
    onCloseList();
  };

  render() {
    const { list, current_uuid, show } = this.props;

    return (
      <div className={b(null, { show })}>
        {list.map((lesson) => {
          return <Item key={lesson.id}
                       active={current_uuid === lesson.uuid}
                       uuid={lesson.uuid}
                       name={lesson.name}
                       onLink={this.handleOnLink} />;
        })}
      </div>
    );
  }
}
