import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './footer.module.sass';

const b = block(style);

type FooterProps = {};
type FooterState = {};

@inject(() => ({}))
@observer
export class Footer extends React.Component<FooterProps, FooterState> {
  render() {
    return (
      <footer className={b(null)}>
        footer
      </footer>
    );
  }
}
