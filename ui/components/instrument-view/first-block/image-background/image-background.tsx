import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './image-background.module.sass';

const b = block(style);

type ImageBackgroundProps = {
  instrument: string
};
type ImageBackgroundState = {};

@inject(() => ({}))
@observer
export default class ImageBackground extends React.Component<ImageBackgroundProps, ImageBackgroundState> {
  render() {
    const { instrument, children } = this.props;

    return (
      <div className={b(null)}>
        <picture className={b('picture')}>
          <source srcSet={`/images/services/${instrument}.webp`} type='image/webp' />
          <img src={`/images/services/${instrument}.jpg`} />
        </picture>
        {children}
      </div>
    );
  }
}
