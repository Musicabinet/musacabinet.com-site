import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './profile-user.module.sass';
import { Button, InputSmall, Title } from '../../common';
import { TITLE_SIZE } from '../../../constants';
import { RootStore, UserStore } from '../../../stores';
import { UserUpdateI } from '../../../interfaces';

const b = block(style);

type ProfileUserProps = {
  userStore: UserStore
};
type ProfileUserState = {};

@inject((store: RootStore) => ({
  userStore: store.userStore
}))
@observer
export class ProfileUser extends React.Component<ProfileUserProps, ProfileUserState & UserUpdateI> {
  state = {
    first_name: this.props.userStore.first_name,
    last_name: this.props.userStore.last_name,
    country: this.props.userStore.country,
    city: this.props.userStore.city,
    education: this.props.userStore.education,
    music_education: this.props.userStore.music_education
  };

  static defaultProps = {
    userStore: {}
  };

  handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value } as { [K in keyof UserUpdateI]: UserUpdateI[K] });
  };

  handleOnUpdate = async () => {
    const { userStore } = this.props;
    await userStore.update(this.state);
  };

  render() {
    const { first_name, last_name, country, city, education, music_education } = this.state;

    return (
      <div className={b(null)}>
        <div className='container'>
          <div className='row mb-4'>
            <div className='col-lg-12'>
              <Title size={TITLE_SIZE.FOURTH} className={b('title')}>
                ID
              </Title>
            </div>
          </div>

          <div className='row'>
            <div className='col-xxl-6'>
              <InputSmall label={'Name'}
                          name={'first_name'}
                          value={first_name}
                          onChange={this.handleOnChange} />
            </div>

            <div className='col-xxl-6'>
              <InputSmall label={'Last Name'}
                          name={'last_name'}
                          value={last_name}
                          onChange={this.handleOnChange} />
            </div>

            <div className='col-xxl-6'>
              <InputSmall label={'Country'}
                          name={'country'}
                          value={country}
                          onChange={this.handleOnChange} />
            </div>

            <div className='col-xxl-6'>
              <InputSmall label={'City'}
                          name={'city'}
                          value={city}
                          onChange={this.handleOnChange} />
            </div>

            <div className='col-xxl-6'>
              <InputSmall label={'Education'}
                          name={'education'}
                          value={education}
                          onChange={this.handleOnChange} />
            </div>

            <div className='col-xxl-6'>
              <InputSmall label={'Music Education'}
                          name={'music_education'}
                          value={music_education}
                          onChange={this.handleOnChange} />
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-lg-12 text-right'>
              <Button onClick={this.handleOnUpdate}>Update</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
