import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lesson-list.module.sass';
import { handleDetectClick } from '../../../../../helpers';
import { NumberLesson } from './number-lesson/number-lesson';
import { NameLesson } from './name-lesson/name-lesson';
import { TimeLeft } from './time-left/time-left';
import { ProgressLine } from './progress-line/progress-line';
import { Arrow } from './arrow/arrow';
import { RootStore } from '../../../../../stores';
import { SERVICE_NAME } from '../../../../../constants';
import { List } from './list/list';

const b = block(style);

type LessonListProps = {
  service_name: SERVICE_NAME;
};
type LessonListState = {
  show: boolean;
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class LessonList extends React.Component<LessonListProps, LessonListState> {
  containerLessonListRef = React.createRef<HTMLDivElement>();

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
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
    handleDetectClick(this.containerLessonListRef, this.handleOnCloseList, e);
  };

  handleOnShowList = () => this.setState({ show: true });
  handleOnCloseList = () => this.setState({ show: false });
  handleOnToggleList = () => this.setState((state) => ({ show: !state.show }));

  render() {
    const { show } = this.state;

    return (
      <>
        <div className={b(null)} ref={this.containerLessonListRef} onClick={this.handleOnToggleList}>
          <NumberLesson />
          <NameLesson />
          <TimeLeft />
          <ProgressLine />
          <Arrow show={show} />
          <List show={show} onCloseList={this.handleOnCloseList} />
        </div>
      </>
    );
  }
}
