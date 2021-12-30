import * as React from 'react';
import block from 'bem-css-modules';
import style from './image.module.sass';

const b = block(style);

type ImageMetronomeProps = {};
type ImageMetronomeState = {};

export class ImageMetronome extends React.Component<ImageMetronomeProps, ImageMetronomeState> {
  render() {
    return (
      <img
        src={'/images/metronome.png'}
        srcSet={'/images/metronome@2x.png 2x'}
        className={b(null)}
        alt="Metronome Musicabinet school"
      />
    );
  }
}
