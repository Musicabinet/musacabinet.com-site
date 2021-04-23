import * as React from 'react';
import block from 'bem-css-modules';
import style from "./image-png.module.sass";
import { ImageTagI } from '../../../interfaces';

const b = block(style);

type ImagePNGProps = {};
type ImagePNGState = {};

export class ImagePNG extends React.Component<ImagePNGProps & ImageTagI, ImagePNGState> {
  render() {
    const { path, className, alt } = this.props;

    return (
      <picture className={`${b(null)} ${className}`}>
        <source srcSet={`${path}.webp, ${path}@2x.webp 2x`} type='image/webp' />
        <source srcSet={`${path}@2x.png 2x`} type='image/png' />
        <img src={`${path}.png`} alt={alt} />
      </picture>
    );
  }
}
