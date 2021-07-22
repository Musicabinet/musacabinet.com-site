import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lessons.module.sass';
import { RootStore } from '../../../../stores';
import { GroupLessonI } from '../../../../interfaces';
import { SERVICE_NAME } from '../../../../constants';

const b = block(style);

type GroupLessonItemProps = {
  isTrialShow: boolean,
  service_name: SERVICE_NAME,
  selected_group_lesson_id: number,
  onSetCollectionId: (id: number) => void,
  onSetCourseId: (id: number) => void,
  onSetModuleId: (id: number) => void,
  onSetGroupLessonId: (id: number) => void,
  onSetShowGroupLessonDetail: () => void,
};
type GroupLessonItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,

  selected_group_lesson_id: store.systemStore.selected_group_lesson_id,

  onSetCollectionId: store.systemStore.setCollectionId,
  onSetCourseId: store.systemStore.setCourseId,
  onSetModuleId: store.systemStore.setModuleId,
  onSetGroupLessonId: store.systemStore.setGroupLessonId,
  onSetShowGroupLessonDetail: store.grandChartStore.setShowGroupLessonDetail
}))
@observer
export class GroupLessonItem extends React.Component<GroupLessonItemProps & GroupLessonI, GroupLessonItemState> {

  static defaultProps = {
    selected_group_lesson_id: 0,
    service_name: SERVICE_NAME.SCHOOL,
    onSetCollectionId: () => console.log('Not set handler'),
    onSetCourseId: () => console.log('Not set handler'),
    onSetModuleId: () => console.log('Not set handler'),
    onSetGroupLessonId: () => console.log('Not set handler'),
    onSetShowGroupLessonDetail: () => console.log('Not set handler')
  };

  circle = React.createRef<SVGSVGElement>();
  circleFill = React.createRef<SVGSVGElement>();

  componentDidMount() {
    if (this.circle && this.circle.current) {
      this.circle.current.style.strokeDasharray = `0 113`;
    }
  }

  handleOnClick = () => {
    const {
      collection_id,
      course_id,
      module_id,
      id,
      onSetCollectionId,
      onSetCourseId,
      onSetModuleId,
      onSetGroupLessonId,
      onSetShowGroupLessonDetail
    } = this.props;

    if (collection_id) {
      onSetCollectionId(collection_id);
    }

    onSetCourseId(course_id);
    onSetModuleId(module_id);
    onSetGroupLessonId(id);
    onSetShowGroupLessonDetail();
  };

  render() {
    const { id, service_name, lessons, name, selected_group_lesson_id, isTrialShow } = this.props;

    return (
      <div onClick={this.handleOnClick}
           className={b('item', {
             [service_name]: true,
             [`active-${service_name}`]: selected_group_lesson_id === id,
             [`trial-blocked`]: !isTrialShow
           })}>
        <div className={b('count-lessons')}>{lessons.length}</div>
        <div className={b('title')} dangerouslySetInnerHTML={{ __html: name.replace(/\(/g, '<br/>(') }} />
        <svg className={b('pie')} width={40} height={40} viewBox='0 0 40 40'>
          {/*
          // @ts-ignore */}
          <circle ref={this.circleFill}
                  className={b('fill')}
                  id='two'
                  strokeWidth={2}
                  r={18}
                  cx={20}
                  cy={20}
                  fill='transparent' />
          {/*
          // @ts-ignore */}
          <circle ref={this.circle}
                  className={b('circle')}
                  id={`id_${id}`}
                  strokeWidth={2}
                  r={18}
                  cx={20}
                  cy={20}
                  fill='transparent' />
        </svg>
      </div>
    );
  }
}
