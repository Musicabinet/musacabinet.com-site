import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './metronome.module.sass';
import { ImageMetronome } from './image/image';
import { Bpm } from './bpm/bpm';
import { StartButton } from './start/start';

const b = block(style);

type MetronomeProps = {};
type MetronomeState = {};

@inject(() => ({}))
@observer
export class Metronome extends React.Component<MetronomeProps, MetronomeState> {
  render() {
    return (
      <div className={b(null)}>
        <ImageMetronome />
        <Bpm />
        <StartButton />
      </div>
    );
  }
}
