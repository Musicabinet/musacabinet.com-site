import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './block-content.module.sass';
import { getIcon, LIST_ICON } from '../../../../common/icons';

const b = block(style);

type BlockContentProps = {
  title: string;
  icon: LIST_ICON;
  description: string;
  fix: boolean;
};
type BlockContentState = {};

@inject(() => ({}))
@observer
export class BlockContent extends React.Component<BlockContentProps, BlockContentState> {
  static defaultProps = {
    fix: false
  };

  render() {
    const { icon, title, description, fix } = this.props;

    return (
      <div className={b(null)}>
        {getIcon(icon, b('icon', { fix }))}
        <div className={b('title')}>{title}</div>
        <div className={b('description')}>{description}</div>
      </div>
    );
  }
}
