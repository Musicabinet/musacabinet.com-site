import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './content-service.module.sass';
import { RootStore } from '../../../../../stores';
import { SERVICE_NAME } from '../../../../../constants';
import { ButtonFreeTrial } from '../../../../common';

const b = block(style);

type ContentServiceProps = {
  service_name: SERVICE_NAME,
  instrument: string,
  title: string,
  sub_title: string,
  onShowModal: () => void
};
type ContentServiceState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  instrument: store.systemStore.instrument_name,
  title: store.systemStore.title,
  sub_title: store.systemStore.subTitle
}))
@observer
export class ContentService extends React.Component<ContentServiceProps, ContentServiceState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    instrument: '',
    title: '',
    sub_title: '',
    onShowModal: () => console.log('Not set handler')
  };

  render() {
    const { service_name, title, sub_title } = this.props;
    return (
      <div className={b(null)}>
        <picture className={b('logotype')}>
          <source srcSet={`/images/logotype/${service_name}.webp, /images/logotype/${service_name}@2x.webp 2x`}
                  type='image/webp' />
          <img src={`/images/logotype/${service_name}.png`} srcSet={`/images/logotype/${service_name}@2x.png 2x`} />
        </picture>

        <div className={b('title')} dangerouslySetInnerHTML={{ __html: title }} />
        <div className={b('sub-title')} dangerouslySetInnerHTML={{ __html: sub_title }} />

        <div className={b('action')}>
          <ButtonFreeTrial />
        </div>
      </div>
    );
  }
}
