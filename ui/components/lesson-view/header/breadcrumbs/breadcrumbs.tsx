import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './breadcrumbs.module.sass';
import { RootStore } from '../../../../../stores';
import { SERVICE_NAME } from '../../../../../constants';
import { BreadcrumbsI } from '../../../../../interfaces';
import { BreadcrumbsItem } from './item';
import { LIST_ICON } from '../../../../common/icons';

const b = block(style);

type BreadCrumbsProps = {
  instrument_name: LIST_ICON.GUITAR | LIST_ICON.SAXOPHONE | LIST_ICON.KEYBOARD;
  service_name: SERVICE_NAME;
  breadcrumbs: BreadcrumbsI[];
};
type BreadCrumbsState = {};

@inject((store: RootStore) => ({
  service_name: store.lessonStore.group_lesson?.collections?.serviceName,
  instrument_name: store.lessonStore.group_lesson?.collections?.instrumentName,
  breadcrumbs: store.lessonStore.breadcrumbs
}))
@observer
export class BreadCrumbs extends React.Component<BreadCrumbsProps, BreadCrumbsState> {
  static defaultProps = {
    instrument_name: LIST_ICON.GUITAR,
    service_name: SERVICE_NAME.SCHOOL,
    breadcrumbs: []
  };

  render() {
    const { service_name, breadcrumbs } = this.props;

    return (
      <div
        className={b(null, {
          [service_name]: true
        })}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <BreadcrumbsItem
              key={`${breadcrumb.name}_${breadcrumb.type}`}
              current={index + 1}
              total={breadcrumbs.length}
              name={breadcrumb.name}
              type={breadcrumb.type}
            />
          );
        })}
      </div>
    );
  }
}
