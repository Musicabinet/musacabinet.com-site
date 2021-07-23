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
              <p>Kazan, Russia</p>
              <p>Musicabinet Ltd</p>
              <p>TIN: 1660299477</p>
              <p>Patrisa Lumumbi street, building 49A, office 12</p>
              <p>Kazan, Russian Federation</p>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
