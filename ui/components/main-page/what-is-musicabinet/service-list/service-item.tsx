import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './service-list.module.sass';
import { ServiceI } from '../../../../../interfaces';
import { getIcon } from '../../../../common/icons';

const b = block(style);

type ServiceItemProps = {};
type ServiceItemState = {};

@inject(() => ({}))
@observer
export class ServiceItem extends React.Component<ServiceItemProps & ServiceI, ServiceItemState> {

  getText = () => {
    const { slug } = this.props;

    if (slug === 'school') {
      return 'From Beginner to Intermediate';
    } else if (slug === 'college') {
      return 'From Intermediate to Advanced';
    } else if (slug === 'university') {
      return 'From Advanced to Professional';
    }

  };

  render() {
    const { slug } = this.props;

    return (
      <div className='col-lg-4'>
        <div className={b('item')}>
          {/*
            // @ts-ignore */}
          {getIcon(slug.toUpperCase(), b('icon', { [slug]: true }))}
        </div>

        <div className={b('description')}>{this.getText()}</div>
      </div>
    );
  }
}
