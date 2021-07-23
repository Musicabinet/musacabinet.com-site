import { action, computed, makeObservable, observable } from 'mobx';
import { Cookie } from '../core';

export class MetronomeStore {

  @observable current: number = 80;
  @observable volume: number = 0.5;
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
      this.volume = Number(localStorage.getItem('volume-metronome')) || 0.5;
      this.worker = new Worker('/workers/metronome-worker.js');
      this.audioPlayer = new Audio('/metronome/metronome.mp3');

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
  };

  @action.bound
  onStop() {
    if (this.worker) {
      this.worker.postMessage({ type: 'stop' });
      this.isPlay = false;
    }
  };

  @action.bound
  changeVolume(_name: string, volume: number) {
    this.volume = volume;

    if (this.audioPlayer) {
      this.audioPlayer.volume = volume;
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
