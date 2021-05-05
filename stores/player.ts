import { action, makeObservable, observable } from 'mobx';
import { SystemStore } from './system';
import { LessonStore } from './lesson';
import * as Tone from 'tone';
import { LibraryType } from '../constants';

interface ImportStore {
  systemStore: SystemStore,
  lessonStore: LessonStore
}

export class PlayerStore {

  @observable is_playing: boolean = false;
  @observable bpm: number = 0;
  @observable selected_library_id: number = 0;
  @observable library_type: LibraryType = LibraryType.SINGLE;
  @observable player: Tone.Player[] = [];

  @observable drumsMute: boolean = false;
  @observable bassMute: boolean = false;
  @observable keysMute: boolean = false;


  systemStore: SystemStore;
  lessonStore: LessonStore;

  constructor(initialData: PlayerStore | null, { systemStore, lessonStore }: ImportStore) {
    makeObservable(this);

    this.systemStore = systemStore;
    this.lessonStore = lessonStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  loadTrack() {

    console.log('load track');

    // Останавливаем все треки
    this.onStop();

    // Очищаем плеер
    this.player = [];

    const selected_accompaniment = this.lessonStore.selected_accompaniment;
    if (selected_accompaniment === 0) {
      console.warn(`Not selected accompaniment`);
      return false;
    }
    const current_accompaniment = this.lessonStore.accompaniments.find((accompaniment) => accompaniment.id === selected_accompaniment);
    // Получаем треки
    const current_library = (current_accompaniment)
      ? current_accompaniment.libraries.find((library) => library.id === this.selected_library_id)
      : null;

    if (!current_library) {
      console.warn(`Not selected current library`);
      return null;
    }

    console.log('current_library', current_library);

    // Записываем тип
    this.library_type = current_library.type;

    // В зависимости от типа загружаем дорожку
    current_library.tracks.forEach((track) => {
      this.player.push(
        new Tone.Player({
          url: `${CONTENT_URL}${track.path}`,
          loop: true,
          volume: -12 // -100 0
        }).toDestination()
      );
    });
  }

  @action.bound
  setFirstLibrary() {
    const selected_accompaniment = this.lessonStore.selected_accompaniment;
    if (selected_accompaniment === 0) {
      console.warn(`Not selected accompaniment`);
      return false;
    }

    const current_accompaniment = this.lessonStore.accompaniments.find((accompaniment) => accompaniment.id === selected_accompaniment);

    if (current_accompaniment && current_accompaniment.libraries.length > 0) {
      this.selected_library_id = current_accompaniment.libraries[0].id;
    }
    console.log('this.selected_library_id', this.selected_library_id);
  }

  @action.bound
  init() {
    console.log(this.lessonStore.accompaniments);
  }

  @action.bound
  onPlay() {
    this.player.forEach((player) => {
      player.start(0);
      console.log(player.state);
    });

    this.is_playing = true;
  }

  @action.bound
  onStop() {
    this.player.forEach((player) => {
      player.stop();
    });

    this.is_playing = false;
  }

  @action.bound
  onBack() {
    this.player.forEach((player) => {
      player.stop(0);
    });

    this.is_playing = false;
  }

  @action.bound
  setLibrary(id_library: number) {
    this.selected_library_id = id_library;
  }

  @action.bound
  onMute(player: 0 | 1 | 2) {

    if (!this.player[player]) {
      console.log(`Not player for mute`);
      return false;
    }

    const current_mute = this.player[player].mute;

    this.player[player].mute = (!current_mute);

    if (player === 0) {
      this.bassMute = (!current_mute);
    } else if (player === 1) {
      this.drumsMute = (!current_mute);
    } else if (player === 2) {
      this.keysMute = (!current_mute);
    }
  }

  @action
  fillingStore(data: PlayerStore) {
    const { is_playing, bpm } = data;

    this.is_playing = is_playing;
    this.bpm = bpm;
  }

}
