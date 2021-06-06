import * as React from 'react';
import {inject, observer} from 'mobx-react';
import { BaseLayout } from '../../ui';
import { CustomAppContext } from '../../interfaces';

type ContactPageProps = {};
type ContactPageState = {};

@inject(() => ({}))
@observer
export default class ContactPage extends React.Component<ContactPageProps, ContactPageState> {

  static async getInitialProps({}: CustomAppContext) {
    return {
      title: 'MUSICABINET | Contact Us',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (<BaseLayout>

    </BaseLayout>);
  }
}
