import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './main-page.module.sass';
import { ComprehensiveMusicEducation } from './comprehensive-music-education/comprehensive-music-education';
import { WhatIsMusicabinet } from './what-is-musicabinet/what-is-musicabinet';

const b = block(style);

type MainPageProps = {};
type MainPageState = {};

@inject(() => ({}))
@observer
export class MainPage extends React.Component<MainPageProps, MainPageState> {
  render() {
    return (
      <div className={b(null)}>
        <ComprehensiveMusicEducation />
        <WhatIsMusicabinet />
      </div>
    );
  }
}
