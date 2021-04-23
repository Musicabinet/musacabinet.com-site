import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './container-main.module.sass';

const b = block(style);

type ContainerMainProps = {};
type ContainerMainState = {};

@inject(() => ({}))
@observer
export class ContainerMain extends React.Component<ContainerMainProps, ContainerMainState> {
  render() {
    const { children } = this.props;

    return (
      <main className={b(null)}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              {children}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
