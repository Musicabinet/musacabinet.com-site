import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './container-main.module.sass';

const b = block(style);

type ContainerMainProps = {
  background: 'gray' | 'default';
};
type ContainerMainState = {};

@inject(() => ({}))
@observer
export class ContainerMain extends React.Component<ContainerMainProps, ContainerMainState> {
  static defaultProps = {
    background: 'default'
  };

  render() {
    const { children, background } = this.props;

    return (
      <main
        className={b(null, {
          [background]: true
        })}
      >
        <div className="container g-lg-0">
          <div className="row g-lg-0">
            <div className="col-lg-12">{children}</div>
          </div>
        </div>
      </main>
    );
  }
}
