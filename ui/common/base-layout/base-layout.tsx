import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ContainerMain } from '../container-main/container-main';

type BaseLayoutProps = {};
type BaseLayoutState = {};

@inject(() => ({}))
@observer
export class BaseLayout extends React.Component<BaseLayoutProps, BaseLayoutState> {
  render() {
    const { children } = this.props;
    return (
      <>
        <Header />
        <ContainerMain>
          {children}
        </ContainerMain>
        <Footer />
      </>
    );
  }
}
