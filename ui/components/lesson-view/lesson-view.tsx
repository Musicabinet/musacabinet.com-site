import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lesson-view.module.sass';
import { Header } from './header/header';
import { Scores } from './scores/scores';
import { Method } from './method/method';

const b = block(style);

type LessonViewProps = {};
type LessonViewState = {};

@inject(() => ({}))
@observer
export class LessonView extends React.Component<LessonViewProps, LessonViewState> {
  render() {
    return (
      <div className={b(null)}>
        <Header />

        <div className={b('content')}>
          <div className={b('left')}>
            <Scores />
          </div>
          <div className={b('right')}>
            <Method  />
          </div>
        </div>
      </div>
    );
  }
}
