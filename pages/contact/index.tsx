import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, Title } from '../../ui';
import { CustomAppContext } from '../../interfaces';
import { TITLE_SIZE } from '../../constants';

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
    return (
      <BaseLayout noStick background={'gray'}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-4 mb-4">
              <Title size={TITLE_SIZE.FIRST}>Contacts</Title>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mt-4 mb-4">
              <p>MUSICABINET Support Service</p>
              <p className="mb-4">support@musicabinet.com</p>

              <p>MUSICABINET General Inquiries</p>
              <p className="mb-4">info@musicabinet.com</p>

              <p className="mb-4">MUSICABINET Mailing Address</p>

              <p>420081, Kazan, Russia</p>
              <p>MUSICABINET LLC</p>
              <p>INN (TIN): 1660299477</p>
              <p>KPP: 166001001</p>
              <p>Patrisa Lumumbi street, building 49A, office 12</p>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
