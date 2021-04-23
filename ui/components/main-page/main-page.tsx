import * as React from 'react';
import {inject, observer} from 'mobx-react';
import block from 'bem-css-modules';
import style from "./main-page.module.sass";

const b = block(style);

type MainPageProps = {};
type MainPageState = {};

@inject(() => ({}))
@observer
export class MainPage extends React.Component<MainPageProps, MainPageState> {
  render() {
    return (
      <div className={b(null)}>fdgdfsg</div>
    );
  }
}
