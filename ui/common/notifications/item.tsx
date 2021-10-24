import * as React from 'react';
import block from 'bem-css-modules';
import style from './notifications.module.sass';
import { NotificationI } from '../../../interfaces';

const b = block(style);

type NotificationItemProps = {
  onRemove: () => void;
};
type NotificationItemState = {};

export class NotificationItem extends React.Component<NotificationItemProps & NotificationI, NotificationItemState> {
  public timeoutID: null | NodeJS.Timeout = null;

  componentDidMount() {
    this.timeoutID = setTimeout(() => {
      const { onRemove } = this.props;
      onRemove();
    }, 4000);
  }

  handleOnClick = () => {
    const { onRemove } = this.props;

    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }

    onRemove();
  };

  render() {
    const { type, title, message } = this.props;

    return (
      <div className={b('item', { type })} onClick={this.handleOnClick}>
        <div className={b('icon')}>
          <i className="las la-exclamation-circle" />
        </div>

        <div className={b('body')}>
          <div className={b('title')}>{title}</div>
          <div className={b('message')}>{message}</div>
        </div>
      </div>
    );
  }
}
