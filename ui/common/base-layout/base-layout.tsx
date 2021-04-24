import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ContainerMain } from '../container-main/container-main';

type BaseLayoutProps = {
  background: 'default' | 'gray',
  full: boolean
};
type BaseLayoutState = {};

@inject(() => ({}))
@observer
export class BaseLayout extends React.Component<BaseLayoutProps, BaseLayoutState> {

  static defaultProps = {
    background: 'default',
    full: false
  };

  render() {
    const { children, background, full } = this.props;
    return (
      <>
        <Header />

        {
          full
            ? (children)
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
