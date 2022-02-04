import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './button-free-trial.module.sass';
import { RootStore } from '../../../stores';
import Router from 'next/router';
import { MODALS } from '../../../constants';
import { LocalStorage } from '../../../core';

const b = block(style);

type ButtonFreeTrialProps = {
  isAuth: boolean;
  textNotAuth: string;
  textIsAuth: string;
  onShow: (id_modal: MODALS) => void;
};
type ButtonFreeTrialState = {
  uuid: string
};

@inject((store: RootStore) => ({
  isAuth: store.authStore.isAuth,
  onShow: store.modalsStore.show
}))
@observer
export class ButtonFreeTrial extends React.Component<ButtonFreeTrialProps, ButtonFreeTrialState> {
  static defaultProps = {
    isAuth: false,
    textNotAuth: 'Start FREE trial',
    textIsAuth: 'Continue learning',
    onShow: () => console.log('Not set handler')
  };

  state = {
    uuid: ''
  }

  componentDidMount() {
    this.setState({
      uuid: LocalStorage.get('lesson_id_q')
    });
  }

  getTitle = () => {
    const { isAuth, textNotAuth, textIsAuth } = this.props;
    return isAuth ? textIsAuth : textNotAuth;
  };

  handleOnClick = async () => {
    const { isAuth, onShow } = this.props;
    const {uuid} = this.state;
    if (isAuth) {

      if(uuid.length > 0){
        await Router.push(`/lesson/${uuid}`);
      }else{
        await Router.push(`/cabinet`);
      }
    } else {
      onShow(MODALS.SIGN_IN);
    }
  };

  render() {
    return (
      <button className={b(null)} onClick={this.handleOnClick}>
        {this.getTitle()}
      </button>
    );
  }
}
