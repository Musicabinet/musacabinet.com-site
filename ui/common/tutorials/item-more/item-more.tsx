import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './item-more.module.sass';
import { TutorialStore } from '../../../../stores/tutorial';
import { RootStore } from '../../../../stores';
import { TutorialsStore } from '../../../../stores/tutorials';

const b = block(style);

type ItemMoreProps = {
  tutorial: TutorialStore,
  tutorialsStore: TutorialsStore
};
type ItemMoreState = {};

@inject((store: RootStore) => ({
  tutorialsStore: store.tutorialsStore
}))
@observer
export class ItemMore extends React.Component<ItemMoreProps, ItemMoreState> {

  static defaultProps = {
    tutorialsStore: {}
  };

  render() {
    const { tutorial, tutorialsStore } = this.props;

    return <div className='col-lg-4' onClick={() => tutorialsStore.setSelectedId(tutorial.id)}>
      <div className={b(null)}>
        <div className={b('preview')}>
          <img src='/images/MC_logo_platform.png' alt='Musicabinet' />
        </div>

        <div className={b('title')}>{tutorial.title}</div>
        <div className={b('description')}>{tutorial.description}</div>
      </div>
    </div>;
  }
}
