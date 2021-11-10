import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './service-list.module.sass';
import { getIcon, LIST_ICON } from '../../../../common/icons';
import { ServiceStore } from '../../../../../stores/service';

const b = block(style);

type ServiceItemProps = {
  service: ServiceStore
};
type ServiceItemState = {};

@inject(() => ({}))
@observer
export class ServiceItem extends React.Component<ServiceItemProps, ServiceItemState> {
  getText = () => {
    const { service } = this.props;

    if (service.slug === 'school') {
      return 'From Beginner to Intermediate';
    } else if (service.slug === 'college') {
      return 'From Intermediate to Advanced';
    } else if (service.slug === 'university') {
      return 'From Advanced to Professional';
    }
  };

  render() {
    const { service } = this.props;

    return (
      <div className="col-lg-4">
        <div className={b('item')}>
          {getIcon(service.slug.toUpperCase() as LIST_ICON, b('icon'))}
        </div>

        <div className={b('description')}>{this.getText()}</div>
      </div>
    );
  }
}
