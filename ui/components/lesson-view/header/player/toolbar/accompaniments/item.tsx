import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './accompaniments.module.sass';
import { AccompanimentI } from '../../../../../../../interfaces';
import { RootStore } from '../../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../../constants';

const b = block(style);

type AccompanimentItemProps = {
  service_name: SERVICE_NAME,
  selected: boolean,
  selected_name_track: string,
  onChoose: (id: number) => void,
  onSetLibrary: (id_library: number) => void,
  onLoadTrack: () => void,
};
type AccompanimentItemState = {
  isShow: boolean
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  onSetLibrary: store.playerStore.setLibrary,
  onLoadTrack: store.playerStore.loadTrack
}))
@observer
export class AccompanimentItem extends React.Component<AccompanimentItemProps & AccompanimentI, AccompanimentItemState> {

  containerAccompaniment = React.createRef<HTMLDivElement>();

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    onLoadTrack: () => console.log('Not set handler'),
    onSetLibrary: () => console.log('Not set handler')
  };

  state = {
    isShow: false
  };

  handleOnClick = (e: React.FormEvent<HTMLDivElement>) => {
    const { service_name, id, selected, libraries, onSetLibrary, onLoadTrack, onChoose } = this.props;

    if (selected) {
      return false;
    }

    if (selected) {
      // Закрываем окно
      this.handleOnToggle(e);
    }

    if (service_name !== SERVICE_NAME.SCHOOL && Array.isArray(libraries) && libraries.length > 0) {
      onSetLibrary(libraries[0].id);
      onLoadTrack();
    }

    onChoose(id);
  };

  handleOnToggle = (e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLDivElement>) => {
    e.stopPropagation();
    this.setState((state) => ({ isShow: !state.isShow }));
  };

  handleOnClose = () => {
    this.setState({ isShow: false });
  };

  render() {
    const { service_name, selected, name } = this.props;

    return (
      <div className={b('item', { selected })}
           ref={this.containerAccompaniment}
           onClick={this.handleOnClick}>

        {
          (service_name === SERVICE_NAME.SCHOOL)
            ? `${name}`
            : name
        }

        {/*{(service_name === SERVICE_NAME.SCHOOL) && (
          <>
            <button className={b('arrow')}
                    onClick={this.handleOnToggle} />
            <TrackList show={isShow}
                       list={libraries}
                       onCloseList={this.handleOnClose} />
          </>
        )}*/}
      </div>
    );
  }
}
