import { action, computed, makeObservable, observable } from 'mobx';
import { BreadcrumbsI, LessonI, LessonListI, ScoreI } from '../interfaces';
import { API } from '../core';
import { GroupLessonStore } from './group-lesson';
import { ScoreStore } from './score';
import { AccompanimentStore } from './accompaniment';
import { CHART_TYPE, METHODS_REQUEST, SCORE_TYPE } from '../constants';
import { ScoreItemStore } from './score-item';
import { ChartItemI } from '../interfaces/chart';
import { ChartStore } from './chart';
import { RootStore } from './index';

let rootStore: RootStore;

export class LessonStore implements LessonI {
  @observable isFetch: boolean = false;

  @observable id = 0;
  @observable uuid = '';
  @observable group_lesson_id: number | undefined = undefined;
  @observable sort = 0;
  @observable slug = '';
  @observable meta_title = '';
  @observable meta_description = '';
  @observable meta_keywords = '';
  @observable name = '';
  @observable description = '';
  @observable duration_minute = 0;
  @observable is_active = false;
  @observable scores: ScoreStore[] = [];
  @observable charts: ChartStore[] = [];
  @observable group_lesson: GroupLessonStore | undefined = undefined;
  @observable accompaniments: AccompanimentStore[] = [];
  @observable breadcrumbs: BreadcrumbsI[] = [];
  @observable progress_second = 0;
  @observable lesson_list: LessonListI[] = [];

  @observable prevModuleLesson: null | string = null;
  @observable nextModuleLesson: null | string = null;
  @observable selected_accompaniment: number = 0;
  @observable video_iframe: string | null = null;

  @observable currentScore: number = 0;
  @observable currentPreviewScoreIndex: number = 0;
  @observable currentPreviewScorePath: string = '';

  @observable currentChart: number = 0;
  @observable currentPreviewChartIndex: number = 0;
  @observable currentPreviewChartPath: string = '';

  constructor(initialData: LessonStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  reset() {
    this.id = 0;
    this.uuid = '';
    this.group_lesson_id = 0;
    this.sort = 0;
    this.slug = '';
    this.meta_title = '';
    this.meta_description = '';
    this.meta_keywords = '';
    this.name = '';
    this.description = '';
    this.duration_minute = 0;
    this.is_active = false;
    this.group_lesson = undefined;
    this.scores = [];
    this.charts = [];
    this.accompaniments = [];
    this.breadcrumbs = [];
    this.lesson_list = [];
    this.progress_second = 0;

    this.prevModuleLesson = null;
    this.nextModuleLesson = null;
    this.selected_accompaniment = 0;
    this.video_iframe = null;
    this.currentScore = 0;
    this.currentPreviewScoreIndex = 0;
    this.currentPreviewScorePath = '';

    this.currentChart = 0;
    this.currentPreviewChartIndex = 0;
    this.currentPreviewChartPath = '';
  }

  @action.bound
  async get(uuid: string) {
    this.isFetch = true;

    try {
      const response = await API.request<LessonI>(`lessons/${uuid}`);
      this.fillingStore(response);

      // Выбираем первый аккомпонимент
      if (this.accompaniments.length > 0) {
        this.selected_accompaniment = this.accompaniments[0].id;
      }
    } catch (e) {
      console.error(`Error im method LessonStore.get : `, e);
    } finally {
      this.isFetch = false;
    }
  }

  @action.bound
  async getVideo(id_video: number) {
    try {
      if (!id_video) {
        return false;
      }

      const response = await API.request(`scores/get-video`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData({
          id_video
        })
      });

      // @ts-ignore
      this.video_iframe = response.video.embed_code;
    } catch (e) {
      console.error(`Error in method getVideo : `, e);
    }
  }

  @action.bound
  async getModuleMapping() {
    try {
      const result = await API.request<any>(`map/get`, {
        method: 'POST',
        body: API.getFormData({
          service_id: rootStore.systemStore.service_id,
          instrument_id: rootStore.systemStore.instrument_id
        })
      });

      const currentCourseId = this.group_lesson?.collections?.course_id;
      const currentModuleId = this.group_lesson?.collections?.module_id;

      //  Текущий курс-моудль
      const find_course_module_key = `${currentCourseId}-${currentModuleId}`;

      const findIndex = Object.keys(result).findIndex((key) => {
        return key == find_course_module_key;
      });

      const arrCourseModule = Object.keys(result);
      const isPrevCourseModule = arrCourseModule[findIndex - 1];
      const isNextCourseModule = arrCourseModule[findIndex + 1];

      if (isPrevCourseModule !== undefined && Array.isArray(result[isPrevCourseModule])) {
        const findPrevLesson = result[isPrevCourseModule].find((item: any) => item.is_finished === false);

        if (findPrevLesson !== undefined) {
          this.prevModuleLesson = findPrevLesson.uuid;
        }
      }

      if (isNextCourseModule !== undefined && Array.isArray(result[isNextCourseModule])) {
        const findNextLesson = result[isNextCourseModule].find((item: any) => item.is_finished === false);

        if (findNextLesson !== undefined) {
          this.nextModuleLesson = findNextLesson.uuid;
        }
      }
    } catch (e) {
      console.error(`Error getModuleMapping: `, e);
    }
  }

  @action.bound
  setAccompaniment(id: number) {
    this.selected_accompaniment = id;
  }

  @action.bound
  showPreviewScore(score_image_id: number) {
    if (this.currentContentScore) {
      this.currentPreviewScoreIndex = this.scoresImages.findIndex((item) => item.id === score_image_id);
    }
  }

  @action.bound
  setCurrentPreviewScoreIndex(score_image_index: number) {
    this.currentPreviewScoreIndex = score_image_index;
  }

  @action.bound
  setCurrentScore(value: number) {
    this.currentScore = value;
    this.selected_accompaniment = this.accompaniments[value].id;
  }

  @action.bound
  incrementProgress() {
    try {
      this.progress_second += 1;
    } catch (e) {
      console.error(`Error in method incrementProgress : `, e);
    }
  }

  @computed
  get showPreviewScorePath() {
    const currentScoreImage = this.scoresImages[this.currentPreviewScoreIndex];
    return currentScoreImage && currentScoreImage.content && currentScoreImage.content.image
      ? currentScoreImage.content.image
      : '';
  }

  @computed
  get showPreviewScoreId(): number {
    const currentScoreImage = this.scoresImages[this.currentPreviewScoreIndex];
    return currentScoreImage && currentScoreImage.content && currentScoreImage.content.image ? currentScoreImage.id : 0;
  }

  @computed
  get number(): number {
    return Number(this.name.replace(/\D+/g, ''));
  }

  @computed
  get duration_second(): number {
    return this.duration_minute * 60;
  }

  @computed
  get timeLeft() {
    let time = '00:00:00';

    if (this.progress_second <= this.duration_second) {
      let left_duration = this.duration_second - this.progress_second;
      let hours = (left_duration / 3600) ^ 0;
      let minutes = ((left_duration - hours * 3600) / 60) ^ 0;
      let second = left_duration - hours * 3600 - minutes * 60;
      time =
        (hours < 10 ? '0' + hours : hours) +
        ':' +
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (second < 10 ? '0' + second : second);
    }
    return time.split(':');
  }

  @computed
  get getPassedLesson(): number {
    let percent = Number(((this.progress_second * 100) / this.duration_second).toFixed(2));

    if (percent >= 100) return 100;
    else return Number(percent);
  }

  @computed
  get getNextLesson(): boolean | string {
    const currentLessonUUID = this.uuid;
    const findIndex = this.lesson_list.findIndex((lesson) => lesson.uuid === currentLessonUUID);

    if (findIndex !== -1) {
      const nextLesson = this.lesson_list[findIndex + 1];

      if (nextLesson) {
        return nextLesson.uuid;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  @computed
  get getPrevLesson(): boolean | string {
    const currentLessonUUID = this.uuid;
    const findIndex = this.lesson_list.findIndex((lesson) => lesson.uuid === currentLessonUUID);

    if (findIndex !== -1) {
      const nextLesson = this.lesson_list[findIndex - 1];

      if (nextLesson) {
        return nextLesson.uuid;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  @computed
  get scoresTotal() {
    return this.scores.length;
  }

  @computed
  get scoresHasNext(): boolean {
    const current = this.currentScore + 1;
    return Boolean(this.scores && this.scores[current]);
  }

  @computed
  get scoresHasPrev(): boolean {
    const current = this.currentScore - 1;
    return Boolean(this.scores && this.scores[current]);
  }

  @computed
  get currentContentScore(): ScoreI | null {
    return this.scores[this.currentScore] || null;
  }

  @computed
  get currentSubTitleScore(): string {
    const current = this.scores[this.currentScore];

    if (current && Array.isArray(current.items) && current.items[0] && current.items[0].content.title) {
      return current.items[0].content.title;
    }

    return '';
  }

  @computed
  get currentContentChart(): ChartStore | null {
    return this.charts[this.currentScore] || null;
  }

  @computed
  get chartImages(): ChartItemI[] {
    const chartsCopy = [...this.charts];

    if (Array.isArray(chartsCopy) && chartsCopy.length > 0) {
      return chartsCopy[this.currentChart].items.filter((item) => item.chart_type_id === CHART_TYPE.IMAGE);
    }

    return [];
  }

  @computed
  get showPreviewChartPath() {
    const currentChartImage = this.chartImages[this.currentPreviewChartIndex];
    return currentChartImage && currentChartImage.content && currentChartImage.content.image
      ? currentChartImage.content.image
      : '';
  }

  @computed
  get totalChartImages(): number {
    return this.chartImages.length;
  }

  @computed
  get hasPrevChartImage(): boolean {
    const currentUpdate = this.currentPreviewScoreIndex - 1;
    return Boolean(this.chartImages[currentUpdate]);
  }

  @computed
  get hasNextChartImage(): boolean {
    const currentUpdate = this.currentPreviewScoreIndex + 1;
    return Boolean(this.chartImages[currentUpdate]);
  }

  @action.bound
  setCurrentPreviewChartIndex(chart_image_index: number) {
    this.currentPreviewChartIndex = chart_image_index;
  }

  @action.bound
  showPreviewChart(chart_image_id: number) {
    if (this.currentContentChart) {
      this.currentPreviewChartIndex = this.chartImages.findIndex((item) => item.id === chart_image_id);
    }
  }

  @computed
  get scoresImages(): ScoreItemStore[] {
    const scoresCopy = [...this.scores];

    if (Array.isArray(scoresCopy) && scoresCopy.length > 0 && scoresCopy[this.currentScore]) {
      return scoresCopy[this.currentScore].items.filter((item) => item.score_type_id === SCORE_TYPE.IMAGE);
    }

    return [];
  }

  @computed
  get totalScoresImages(): number {
    return this.scoresImages.length;
  }

  @computed
  get hasPrevScoreImage(): boolean {
    const currentUpdate = this.currentPreviewScoreIndex - 1;
    return Boolean(this.scoresImages[currentUpdate]);
  }

  @computed
  get hasNextScoreImage(): boolean {
    const currentUpdate = this.currentPreviewScoreIndex + 1;
    return Boolean(this.scoresImages[currentUpdate]);
  }

  @action
  fillingStore(data: LessonStore | LessonI) {
    const {
      id,
      uuid,
      group_lesson_id,
      sort,
      slug,
      group_lesson,
      scores,
      charts,
      accompaniments,
      meta_title,
      meta_description,
      meta_keywords,
      name,
      description,
      duration_minute,
      is_active,
      breadcrumbs,
      lesson_list,
      prevModuleLesson,
      nextModuleLesson,
      selected_accompaniment,
      progress_second
    } = data;

    this.id = id;
    this.uuid = uuid;
    this.group_lesson_id = group_lesson_id;
    this.sort = sort;
    this.slug = slug;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.meta_keywords = meta_keywords;
    this.name = name;
    this.description = description;
    this.duration_minute = duration_minute;
    this.is_active = is_active;
    this.group_lesson = group_lesson ? new GroupLessonStore(group_lesson, rootStore) : undefined;
    this.scores = (scores || []).map((score) => new ScoreStore(score));
    this.charts = (charts || []).map((chart) => new ChartStore(chart));
    this.accompaniments = (accompaniments || []).map((accompaniment) => new AccompanimentStore(accompaniment));
    this.breadcrumbs = breadcrumbs ? [...breadcrumbs] : [];
    this.lesson_list = lesson_list || [];
    this.progress_second = progress_second;

    this.prevModuleLesson = prevModuleLesson || null;
    this.nextModuleLesson = nextModuleLesson || null;
    this.selected_accompaniment = selected_accompaniment || 0;
  }
}
