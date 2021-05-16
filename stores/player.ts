import { action, computed, makeObservable, observable } from 'mobx';
import { SystemStore } from './system';
import { LessonStore } from './lesson';
import * as Tone from 'tone';
import { LibraryTrackType, LibraryType } from '../constants';
import { LibraryTrackI } from '../interfaces';

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

  @observable duration_time: number = 0;
  @observable current_percent: number = 0;

  clearUpdateTime: number = 0;

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

  getMuteTrack = (track: LibraryTrackI): boolean => {
    if (track.type === LibraryTrackType.BASS) {
      return this.bassMute;
    } else if (track.type === LibraryTrackType.DRUMS) {
      return this.drumsMute;
    } else if (track.type === LibraryTrackType.KEYBOARDS) {
      return this.keysMute;
    }
    return false;
  };

  @action.bound
  loadTrack() {

    this.current_percent = 0;

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

    // Записываем тип
    this.library_type = current_library.type;

    // В зависимости от типа загружаем дорожку
    current_library.tracks.forEach((track) => {
      this.player.push(
        new Tone.Player({
          url: `${CONTENT_URL}${track.path}`,
          loop: true,
          mute: this.getMuteTrack(track),
          volume: -12, // -100 0
          onload: () => {
            this.setDurationTime(this.player[0].buffer.duration);
          }
        }).toDestination()
      );
    });
  }

  @action.bound
  setDurationTime(duration: number) {
    this.duration_time = duration;
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
  }

  @action.bound
  init() {
  }

  @action.bound
  onPlay() {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);

    let now = Tone.now();
    Tone.Transport.start(now);
    this.player.forEach((player) => {
      player.start(0);
    });

    this.clearUpdateTime = window.setInterval(() => {
      let currentSecond = Tone.Transport.toSeconds(Tone.Transport.ticks + 'i');
      let percent = Math.round((100 * currentSecond) / this.duration_time);

      if (percent >= 100) {
        Tone.Transport.ticks = 0;
      }

      this.current_percent = percent;
    }, 60);

    this.is_playing = true;
  }

  @action.bound
  onStop() {
    this.player.forEach((player) => {
      player.stop();
    });
    Tone.Transport.stop();

    this.is_playing = false;
    clearInterval(this.clearUpdateTime);
  }

  @action.bound
  onBack() {
    Tone.Transport.stop(0);
    this.player.forEach((player) => {
      player.stop(0);
    });

    this.current_percent = 0;
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

  @action.bound
  setVolume(value: number) {
    console.log('value', value);
    this.player.forEach((player) => {
      player.volume.value = value;
    });
  }

  @action.bound
  setBpm(value: number) {
    this.bpm = value;
  }

  @computed
  get nameSelectedTrack(): string {
    const findAccompaniments = this.lessonStore.accompaniments.find(
      (accompaniment) => accompaniment.id === this.lessonStore.selected_accompaniment
    );

    if (findAccompaniments) {
      const findLibrary = findAccompaniments.libraries.find((library) => library.id === this.selected_library_id);

      if (findLibrary) {
        return findLibrary.name;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }


  @action
  fillingStore(data: PlayerStore) {
    const { is_playing, bpm } = data;

    this.is_playing = is_playing;
    this.bpm = bpm;
  }

}
