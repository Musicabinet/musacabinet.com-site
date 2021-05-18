import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ContainerMain } from '../container-main/container-main';

type BaseLayoutProps = {
  background: 'default' | 'gray',
  headerBackground: 'default' | 'gray',
  full: boolean,
  noStick: boolean
};
type BaseLayoutState = {};

@inject(() => ({}))
@observer
export class BaseLayout extends React.Component<BaseLayoutProps, BaseLayoutState> {

  static defaultProps = {
    background: 'default',
    headerBackground: 'default',
    full: false,
    noStick: false
  };

  render() {
    const { children, background, full, noStick } = this.props;
    return (
      <>
        <Header noStick={noStick} />

        {
          full
            ? <main style={{ flex: 1 }}>{children}</main>
            : (
              <ContainerMain background={background}>
                {children}
              </ContainerMain>
            )
        }

        <Footer />
      </>
    );
  }

}
