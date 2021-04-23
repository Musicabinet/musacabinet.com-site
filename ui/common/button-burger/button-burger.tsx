import * as React from 'react';
import block from 'bem-css-modules';
import style from './button-burger.module.sass';

const b = block(style);

type ButtonBurgerProps = {
  active: boolean,
  onClick: (value: boolean) => void
};
type ButtonBurgerState = {};

export class ButtonBurger extends React.Component<ButtonBurgerProps, ButtonBurgerState> {

  handleOnClick = () => {
    const { active, onClick } = this.props;
    onClick(!active);
  };

  render() {
    const { active } = this.props;

    return (
      <button className={b(null, { show: active })}
              onClick={this.handleOnClick} />
    );
  }
}
