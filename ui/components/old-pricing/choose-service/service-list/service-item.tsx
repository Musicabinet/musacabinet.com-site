import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './service-list.module.sass';
import { ServiceI } from '../../../../../interfaces';
import { SERVICE_NAME } from '../../../../../constants';
import { getIcon, LIST_ICON } from '../../../../common/icons';

const b = block(style);

type ServiceItemProps = {
  selected: boolean,
  onChoose: (service_name: SERVICE_NAME) => void
};
type ServiceItemState = {};

@inject(() => ({}))
@observer
export class ServiceItem extends React.Component<ServiceItemProps & ServiceI, ServiceItemState> {

  getIcon = () => {
    const { slug } = this.props;
    if (slug === SERVICE_NAME.SCHOOL) {
      return getIcon(LIST_ICON.SCHOOL, '');
    } else if (slug === SERVICE_NAME.COLLEGE) {
      return getIcon(LIST_ICON.COLLEGE, '');
    } else if (slug === SERVICE_NAME.UNIVERSITY) {
      return getIcon(LIST_ICON.UNIVERSITY, '');
    }
  };

  getDescription = (): string => {
    const { slug } = this.props;
    if (slug === SERVICE_NAME.SCHOOL) {
      return 'From level Zero <br/> to Beginner';
    } else if (slug === SERVICE_NAME.COLLEGE) {
      return 'From level Beginner <br/>  to Advanced';
    } else if (slug === SERVICE_NAME.UNIVERSITY) {
      return 'From level Advanced <br/>  to Professional';
    }

    return '';
  };

  handleOnClick = () => {
    const { slug, onChoose } = this.props;
    onChoose(slug as SERVICE_NAME);
  };

  render() {
    const { slug, selected } = this.props;

    return (
      <div className='col-lg-4 d-flex justify-content-center'
           onClick={this.handleOnClick}>
        <div className={b('item', { [slug]: true, selected })}>
          <div className={b('icon')}>{this.getIcon()}</div>
          <div className={b('title')}>{slug}</div>
          <div className={b('description')} dangerouslySetInnerHTML={{ __html: this.getDescription() }} />
        </div>
      </div>
    );
  }
}
