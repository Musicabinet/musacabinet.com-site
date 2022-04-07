import { action, computed, makeObservable, observable } from 'mobx';
import { Cookie } from '../core';
import { METRONOME_CONST, SPACE_CONTROL, SPACE_CONTROL_CURRENT } from '../constants';

export class MetronomeStore {
  @observable current: number = 80;
  @observable volume: number = 50;
  @observable isPlay: boolean = false;
  @observable audioPlayer: HTMLAudioElement | null = null;
  @observable worker: Worker | null = null;

  constructor(initialData: MetronomeStore | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async init() {
    try {
      const cookieInstance = Cookie.getInstance();
      this.current = Number(cookieInstance.get('bpm')) || 80;
      this.volume = Number(cookieInstance.get(METRONOME_CONST.VOLUME)) || 50;
      this.worker = new Worker('/workers/metronome-worker.js');
      this.audioPlayer = new Audio('/metronome/metronome.mp3');

      console.log('this.volume', this.volume);

      if (this.worker) {
        this.worker.addEventListener('message', this.onPlayTick);
      }
    } catch (e) {
      console.error(`Error in method init : `, e);
    }
  }

  @action.bound
  setBPM(value: number) {
    const isContinue = this.isPlay;
    if (isContinue) {
      this.onStop();
    }
    this.current = value;
    const cookieInstance = Cookie.getInstance();
    cookieInstance.set('bpm', String(value));

    if (isContinue) {
      this.onStart();
    }
  }

  @action.bound
  onPlayStop() {

    // Записываем что управление клавишей пробел передано метроному
    localStorage.setItem(SPACE_CONTROL_CURRENT, SPACE_CONTROL.METRONOME);

    if (this.isPlay) {
      this.onStop();
    } else {
      this.onStart();
    }
  }

  @action.bound
  onPlayTick = (): void => {
    if (this.audioPlayer) {
      this.audioPlayer.play();
    }
  };

  @action.bound
  onStart() {
    if (this.worker) {
      this.worker.postMessage({
        type: 'start',
        interval: this.intervalMs
      });

      this.isPlay = true;
    }
  }

  @action.bound
  onStop() {
    if (this.worker) {
      this.worker.postMessage({ type: 'stop' });
      this.isPlay = false;
    }
  }

  @action.bound
  changeVolume(_name: string, volume: number) {
    this.volume = volume;

    const cookieInstance = Cookie.getInstance();
    cookieInstance.set(METRONOME_CONST.VOLUME, String(volume));

    if (this.audioPlayer) {
      this.audioPlayer.volume = volume / 100;
    }
  }

  @computed
  get intervalMs() {
    return 60000 / this.current;
  }

  @action
  fillingStore(data: MetronomeStore) {
    const { current } = data;
    this.current = current;
  }
}
