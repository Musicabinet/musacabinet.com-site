import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './profile-user.module.sass';
import { Button, Title } from '../../common';
import { TITLE_SIZE } from '../../../constants';
import { InputText } from '../../common/input-text/input-text';
import { RootStore } from '../../../stores';
import { UserUpdateI } from '../../../interfaces';

const b = block(style);

type ProfileUserProps = {
  onUpdate: (values: UserUpdateI) => Promise<void>;
};
type ProfileUserState = {};

@inject((store: RootStore) => ({
  first_name: store.userStore.first_name,
  last_name: store.userStore.last_name,
  country: store.userStore.country,
  city: store.userStore.city,
  education: store.userStore.education,
  music_education: store.userStore.music_education,
  onUpdate: store.userStore.update
}))
@observer
export class ProfileUser extends React.Component<ProfileUserProps & UserUpdateI, ProfileUserState & UserUpdateI> {
  state = {
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    country: this.props.country,
    city: this.props.city,
    education: this.props.education,
    music_education: this.props.music_education
  };

  static defaultProps = {
    first_name: '',
    last_name: '',
    country: '',
    city: '',
    education: '',
    music_education: '',
    onUpdate: () => console.log('Not set handler')
  };

  handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value } as { [K in keyof UserUpdateI]: UserUpdateI[K] });
  };

  handleOnUpdate = async () => {
    const { onUpdate } = this.props;
    await onUpdate(this.state);
  };

  render() {
    const { first_name, last_name, country, city, education, music_education } = this.state;

    return (
      <div className={b(null)}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12">
              <Title size={TITLE_SIZE.FOURTH} className={b('title')}>
                Your Profile
              </Title>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-12">
              <InputText
                isValid
                placeholder={'Name'}
                value={first_name}
                name={'first_name'}
                label={'Name'}
                onChange={this.handleOnChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-12">
              <InputText
                isValid
                placeholder={'Last Name'}
                value={last_name}
                name={'last_name'}
                label={'Last Name'}
                onChange={this.handleOnChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-12">
              <InputText
                isValid
                placeholder={'Country'}
                value={country}
                name={'country'}
                label={'Country'}
                onChange={this.handleOnChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-12">
              <InputText
                isValid
                placeholder={'City'}
                value={city}
                name={'city'}
                label={'City'}
                onChange={this.handleOnChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-12">
              <InputText
                isValid
                placeholder={'Education'}
                value={education}
                name={'education'}
                label={'Education'}
                onChange={this.handleOnChange}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12">
              <InputText
                isValid
                placeholder={'Music education'}
                value={music_education}
                name={'music_education'}
                label={'Music education'}
                onChange={this.handleOnChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <Button onClick={this.handleOnUpdate}>Update</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
