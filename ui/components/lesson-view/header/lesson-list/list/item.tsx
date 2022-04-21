import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { LessonListItemStore } from '../../../../../../stores/lesson-list-item.store';
import { RootStore, SystemStore } from '../../../../../../stores';

const b = block(style);

type ItemProps = {
  systemStore: SystemStore;
  lessonListItem: LessonListItemStore,
  active: boolean;
  onLink: (uuid: string) => void;
};
type ItemState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore
}))
@observer
export class Item extends React.Component<ItemProps, ItemState> {

  static defaultProps = {
    systemStore: {}
  };

  handleOnLink = () => {
    const { lessonListItem, onLink } = this.props;
    onLink(lessonListItem.uuid);
  };

  render() {
    const { lessonListItem, active, systemStore } = this.props;

    return (
      <div onClick={this.handleOnLink} className={b('item', { active })}>
        <div className={b('number', {
          isGrey: lessonListItem.isGrey,
          [systemStore.service_name]: true
        })}
             style={{ background: lessonListItem.color }}>{lessonListItem.nameForCircle}</div>
        <div className={b('name')}>
          {lessonListItem.nameScore}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, deleniti et eveniet illum nemo nihil
          voluptatum! Architecto cum dolorem, et fuga minus nam nesciunt nulla, numquam placeat, praesentium recusandae
          sapiente sit soluta unde vitae. Ab, at, deleniti distinctio ea illo illum impedit libero maiores nihil
          officiis quia rem repellat sunt?
        </div>
      </div>
    );
  }
}
