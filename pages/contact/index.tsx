import * as React from 'react';
import {inject, observer} from 'mobx-react';
import { BaseLayout } from '../../ui';

type ContactPageProps = {};
type ContactPageState = {};

@inject(() => ({}))
@observer
export default class ContactPage extends React.Component<ContactPageProps, ContactPageState> {
  render() {
    return (<BaseLayout>

    </BaseLayout>);
  }
}
