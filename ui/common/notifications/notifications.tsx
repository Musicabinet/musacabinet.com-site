import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './notifications.module.sass';
import { RootStore } from '../../../stores';
import { Portal } from '../../../helpers';
import { NotificationStore } from '../../../stores/notification';
import { NotificationItem } from './item';

const b = block(style);

type NotificationsProps = {
  list: NotificationStore[]
};
type NotificationsState = {};

@inject((store: RootStore) => ({
  list: store.notificationsStore.list
}))
@observer
export class Notifications extends React.Component<NotificationsProps, NotificationsState> {

  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;

    if (list.length === 0) {
      return null;
    }

    return (
      <Portal>
        <div className={b(null)}>
          {list.map((notification) => {
            return <NotificationItem key={notification.id}
                                     id={notification.id}
                                     title={notification.title}
                                     message={notification.message}
                                     type={notification.type}
                                     onRemove={notification.remove} />;
          })}
        </div>
      </Portal>
    );
  }
}
