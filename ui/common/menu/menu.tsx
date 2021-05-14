import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './menu.module.sass';
import { RootStore } from '../../../stores';
import { MenuI } from '../../../interfaces';
import { MenuItem } from './menu-item';
import { ButtonBurger } from '../button-burger/button-burger';

const b = block(style);

type MenuProps = {
  list: MenuI[]
};
type MenuState = {
  showMobileMenu: boolean
};

@inject((store: RootStore) => ({
  list: store.menuListStore.list
}))
@observer
export class Menu extends React.Component<MenuProps, MenuState> {

  state = {
    showMobileMenu: false
  };

  static defaultProps = {
    list: []
  };

  componentDidUpdate() {
    if (this.state.showMobileMenu) {
      this.removeOverflow(true);
    } else {
      this.removeOverflow();
    }
  }

  componentWillUnmount() {
    this.removeOverflow();
  }

  removeOverflow = (add = false) => {
    const body: HTMLBodyElement | null = document.querySelector('body');

    if (body) {
      if (add) {
        body.classList.add('overflow');
      } else {
        body.classList.remove('overflow');
      }
    }
  };

  handleOnShowMobileMenu = (value: boolean) => {
    this.setState({
      showMobileMenu: value
    });
  };

  handleOnCloseMobileMenu = () => {
    this.setState({
      showMobileMenu: false
    });
  };

  render() {
    const { list } = this.props;
    const { showMobileMenu } = this.state;

    return (
      <>
        <ButtonBurger active={showMobileMenu} onClick={this.handleOnShowMobileMenu} />
        <nav className={b(null, {
          mobile: showMobileMenu
        })}>
          <ul className={b('list')}>
            {list.map((item) => {
              return (<MenuItem key={`${item.link}_${item.type}`}
                                title={item.title}
                                link={item.link}
                                type={item.type}
                                is_active={item.is_active}
                                children={item.children}
                                onCloseMobile={this.handleOnCloseMobileMenu} />);
            })}
          </ul>
        </nav>
      </>
    );
  }
}
