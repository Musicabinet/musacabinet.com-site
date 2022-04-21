import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, Paragraph, Title } from '../../ui';
import { SERVICE_NAME, TITLE_SIZE } from '../../constants';
import { CustomAppContext } from '../../interfaces';

type CompanyInformationPageProps = {};
type CompanyInformationPageState = {};

@inject(() => ({}))
@observer
export default class CompanyInformationPage extends React.Component<
  CompanyInformationPageProps,
  CompanyInformationPageState
> {

  static async getInitialProps({ store }: CustomAppContext) {
    store?.systemStore.setServiceName(SERVICE_NAME.SCHOOL);
    await store?.authStore.check();
    return {
      title: 'MUSICABINET | Company information',
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
              <Title size={TITLE_SIZE.FIRST}>Company information</Title>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mt-4 mb-4">
              <Paragraph>
                Republic of Kazakhstan, Ekibastuz, M. Jusupa street, 20-24<br/>
                +7 701 771 13 87<br/>
                info@musicabinet.com<br/>
              </Paragraph>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
