import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './profile-user.module.sass';
import { Title } from '../../common';
import { TITLE_SIZE } from '../../../constants';

const b = block(style);

type ProfileUserProps = {};
type ProfileUserState = {};

@inject(() => ({}))
@observer
export class ProfileUser extends React.Component<ProfileUserProps, ProfileUserState> {
  render() {
    return (
      <div className={b(null)}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <Title size={TITLE_SIZE.FOURTH} className={b('title')}>Your Profile</Title>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
