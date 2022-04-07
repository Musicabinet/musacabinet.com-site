import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { LessonListItemStore } from '../../../../../../stores/lesson-list-item.store';

const b = block(style);

type ItemProps = {
  lessonListItem: LessonListItemStore,
  active: boolean;
  onLink: (uuid: string) => void;
};
type ItemState = {};

@inject(() => ({}))
@observer
export class Item extends React.Component<ItemProps, ItemState> {
  handleOnLink = () => {
    const { lessonListItem, onLink } = this.props;
    onLink(lessonListItem.uuid);
  };

  render() {
    const { lessonListItem, active } = this.props;

    return (
      <div onClick={this.handleOnLink} className={b('item', { active })}>
        <div className={b('number', { isGrey: lessonListItem.isGrey })}
             style={{ background: lessonListItem.color }}>{lessonListItem.nameForCircle}</div>
        {lessonListItem.name}
      </div>
    );
  }
}
