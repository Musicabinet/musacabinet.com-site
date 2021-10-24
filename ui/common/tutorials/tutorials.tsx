import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './tutorials.module.sass';
import { RootStore } from '../../../stores';
import { Read } from './read/read';
import { TutorialsStore } from '../../../stores/tutorials';
import { ItemMore } from './item-more/item-more';

const b = block(style);

type TutorialsProps = {
  tutorialsStore: TutorialsStore
};
type TutorialsState = {};

@inject((store: RootStore) => ({
  tutorialsStore: store.tutorialsStore
}))
@observer
export class Tutorials extends React.Component<TutorialsProps, TutorialsState> {

  static defaultProps = {
    tutorialsStore: {}
  };

  render() {
    const { tutorialsStore } = this.props;

    return <div className={b(null)}>
      <div className={b('container')}>
        <Read />
      </div>

      <div className={b('more-header')}>More on this topic</div>

      <div className='row'>
        {tutorialsStore.list.map((tutorial) => {
          return <ItemMore key={tutorial.id} tutorial={tutorial} />;
        })}
      </div>
    </div>
      ;
  }
}
