import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './accompaniments.module.sass';
import { AccompanimentI } from '../../../../../../../interfaces';
import { TrackList } from './track-list/track-list';

const b = block(style);

type AccompanimentItemProps = {
  selected: boolean,
  onChoose: (id: number) => void
};
type AccompanimentItemState = {
  isShow: boolean
};

@inject(() => ({}))
@observer
export class AccompanimentItem extends React.Component<AccompanimentItemProps & AccompanimentI, AccompanimentItemState> {

  containerAccompaniment = React.createRef<HTMLDivElement>();

  state = {
    isShow: false
  };

  handleOnClick = () => {
    const { id, selected, onChoose } = this.props;
    if (selected) {
      return false;
    }

    if (selected) {
      // Закрываем окно
      this.handleOnToggle();
    }

    onChoose(id);
  };

  handleOnToggle = () => this.setState((state) => ({ isShow: !state.isShow }));

  render() {
    const { selected, name, libraries } = this.props;
    const { isShow } = this.state;

    return (
      <div className={b('item', { selected })}
           ref={this.containerAccompaniment}
           onClick={this.handleOnClick}>
        {name}
        <button className={b('arrow')}
                onClick={this.handleOnToggle} />
        <TrackList show={isShow}
                   list={libraries}
                   onCloseList={this.handleOnToggle} />
      </div>
    );
  }
}
