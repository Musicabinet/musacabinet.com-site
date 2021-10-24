import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './read.module.sass';
import { RootStore } from '../../../../stores';
import { TutorialsStore } from '../../../../stores/tutorials';

const b = block(style);

type ReadProps = {
  tutorialsStore: TutorialsStore
};
type ReadState = {};

@inject((store: RootStore) => ({
  tutorialsStore: store.tutorialsStore
}))
@observer
export class Read extends React.Component<ReadProps, ReadState> {

  static defaultProps = {
    tutorialsStore: {}
  };

  render() {
    const { tutorialsStore } = this.props;

    return (
      <div className={b(null)}>
        <h3 className={b('header')}>{tutorialsStore.read.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: tutorialsStore.read.content }} />
      </div>
    );
  }
}
