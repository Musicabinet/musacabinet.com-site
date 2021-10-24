import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './comprehensive-music-education.module.sass';
import { ButtonFreeTrial } from '../../../common';

const b = block(style);

type ComprehensiveMusicEducationProps = {};
type ComprehensiveMusicEducationState = {};

@inject(() => ({}))
@observer
export class ComprehensiveMusicEducation extends React.Component<
  ComprehensiveMusicEducationProps,
  ComprehensiveMusicEducationState
> {
  render() {
    return (
      <div className={b(null)}>
        <picture className={b('background')}>
          <source srcSet="/images/background/main.webp" type="image/webp" />
          <img src="/images/background/main.jpg" alt="Musicabinet" />
        </picture>

        <div className={b('content')}>
          <picture>
            <img
              src="/images/MC_logo_platform.png"
              srcSet="/images/MC_logo_platform@2x.png 2x"
              className={b('logotype')}
            />
          </picture>

          <h1 className={b('title')}>Learn to play music instruments 5 times faster</h1>
          <p className={b('description')}>
            <span
              style={{
                fontWeight: 200,
                letterSpacing: 1.3,
                fontSize: '22px'
              }}
            >{`with the advanced education system`}</span>
            <br />
          </p>

          <div className={b('button')}>
            <ButtonFreeTrial />
          </div>
        </div>
      </div>
    );
  }
}
