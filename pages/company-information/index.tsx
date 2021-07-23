import * as React from 'react';
import {inject, observer} from 'mobx-react';
import { BaseLayout, Title } from '../../ui';
import { TITLE_SIZE } from '../../constants';

type CompanyInformationPageProps = {};
type CompanyInformationPageState = {};

@inject(() => ({}))
@observer
export default class CompanyInformationPage extends React.Component<CompanyInformationPageProps, CompanyInformationPageState> {
  render() {
    return (
      <BaseLayout noStick background={'gray'}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 mt-4 mb-4'>
              <Title size={TITLE_SIZE.FIRST}>Company information</Title>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12 mt-4 mb-4'>
              ghdfh
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
