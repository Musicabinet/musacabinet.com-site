import * as React from 'react';
import block from 'bem-css-modules';
import style from './image-jpg.module.sass';
import { ImageTagI } from '../../../interfaces';

const b = block(style);

type ImageJPGProps = {};
type ImageJPGState = {};

export class ImageJPG extends React.Component<ImageJPGProps & ImageTagI, ImageJPGState> {
  render() {
    const { path, className, alt } = this.props;

    return (
      <picture className={`${b(null)} ${className}`}>
        <source srcSet={`${path}.webp`} type='image/webp' />
        <source srcSet={`${path}.jpg`} type='image/jpeg' />
        <img src={`${path}.jpg`} alt={alt} />
      </picture>
    );
  }
}
