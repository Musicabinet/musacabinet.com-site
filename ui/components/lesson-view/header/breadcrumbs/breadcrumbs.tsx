import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './breadcrumbs.module.sass';
import { RootStore } from '../../../../../stores';
import { SERVICE_NAME } from '../../../../../constants';
import { BreadcrumbsI } from '../../../../../interfaces';
import { BreadcrumbsItem } from './item';
import { LIST_ICON } from '../../../../common/icons';
import { ucFirst } from '../../../../../helpers';

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

  getNumberType = (name: string) => {
    switch (name) {
      case 'Basic':
        return 1;
      case 'Progressive':
        return 2;
      case 'Super Progressive':
        return 3;
      case 'Cosmic':
        return 1;
      case 'Super Cosmic':
        return 2;
      case 'Nova':
        return 3;
      case 'Supernova':
        return 4;

      // Module
      case '1. RHYTHM TRAINING':
        return 1;
      case '2. MUSIC LITERATURE':
        return 2;
      case '3. BASIC HARMONY':
        return 3;
      case '4. SOLFEGGIO':
        return 4;
      case '5. ARPEGGIOS':
        return 5;
      case '6. NATURAL MODES':
        return 6;
      case '7. TRAINING SCHEMES':
        return 7;
      case '1. CHORDS':
        return 1;
      case '2. ARPEGGIOS':
        return 2;
      case '3. SCALES':
        return 3;
      case '4. IMPROVISATION':
        return 4;
      default:
        return '';
    }
  };


  getTitle = () => {
    const { breadcrumbs } = this.props;
    let complete = '';

    breadcrumbs.forEach((item, index) => {
      complete += `${item.type} : ${ucFirst(item.name).replace(/[0-9]./g, '')}`;
      complete += (breadcrumbs.length - 1 === index ? '' : ' / ');
    });

    return complete;

  };

  render() {
    const { service_name, breadcrumbs } = this.props;

    return (
      <div
        className={b(null, {
          [service_name]: true
        })}
      >
        <div className={b('container')}
             title={this.getTitle()}>
          {breadcrumbs.map((breadcrumb, index) => {
            return (
              <BreadcrumbsItem
                key={`${breadcrumb.name}_${breadcrumb.type}`}
                current={index + 1}
                total={breadcrumbs.length}
                name={`${breadcrumb.name}`}
                type={`${breadcrumb.type} ${this.getNumberType(breadcrumb.name)}`}
              />
            );
          })}
        </div>

      </div>
    );
  }
}
