import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { LessonStore, PlayerStore, RootStore, SystemStore } from '../../../../../../../stores';
import block from 'bem-css-modules';
import style from './burger-accompaniments.module.sass';
import { AccompanimentItem } from './accompaniment-item';
import { handleDetectClick } from '../../../../../../../helpers';

const b = block(style);

type BurgerAccompanimentsProps = {
  systemStore: SystemStore;
  lessonStore: LessonStore;
  playerStore: PlayerStore;
};
type BurgerAccompanimentsState = {
  show: boolean
};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  lessonStore: store.lessonStore,
  playerStore: store.playerStore
}))
@observer
export class BurgerAccompaniments extends React.Component<BurgerAccompanimentsProps, BurgerAccompanimentsState> {

  public containerRef = React.createRef<HTMLButtonElement>();

  static defaultProps = {
    systemStore: {},
    lessonStore: {},
    playerStore: {}
  };

  state = {
    show: false
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (e: MouseEvent) => {
    handleDetectClick(this.containerRef, this.handleOnHide, e);
  };

  handleOnShow = () => this.setState((state) => {
    if (state.show) {
      return state;
    } else {
      return {
        show: true
      };
    }
  });

  handleOnHide = () => {
    this.setState(() => ({
      show: false
    }));
  };

  render() {
    const { systemStore, lessonStore, playerStore } = this.props;
    const { show } = this.state;

    const findAccompaniment = lessonStore.accompaniments.find((item) => item.id === lessonStore.selected_accompaniment);
    const findLibrary = findAccompaniment && findAccompaniment.libraries && findAccompaniment.libraries.find((library) => library.id === playerStore.selected_library_id);

    return (
      <>
        <button onClick={this.handleOnShow}
                ref={this.containerRef}
                className={b(null, {
                  [systemStore.service_name]: true
                })}>
          <span />
          <span />
          <span />

          <div className={b('list', { show })}>
            <ul>
              {findAccompaniment && findAccompaniment.libraries && findAccompaniment.libraries.map((library, index) => {
                return (
                  <AccompanimentItem key={library.id}
                                     library={library}
                                     active={playerStore.selected_library_id === library.id}
                                     ordinalNumber={index}
                                     onClose={this.handleOnHide} />
                );
              })}
            </ul>
          </div>
        </button>

        {findLibrary && (
          <div className={b('name-track')}>{findLibrary.name}</div>
        )}
      </>
    );
  }
}
