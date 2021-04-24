import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lesson-view.module.sass';
import { Header } from './header/header';

const b = block(style);

type LessonViewProps = {};
type LessonViewState = {};

@inject(() => ({}))
@observer
export class LessonView extends React.Component<LessonViewProps, LessonViewState> {
  render() {
    return (
      <div className={b(null)}>
        <div className={b('message')}>Collecting data from the database</div>
        <Header />
      </div>
    );
  }
}
