import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './study-at.module.sass';
import { Title } from '../title/title';
import { TITLE_SIZE } from '../../../constants';
import { ButtonFreeTrial } from '../button-free-trial/button-free-trial';

const b = block(style);

type StudyAtProps = {};
type StudyAtState = {};

@inject(() => ({}))
@observer
export class StudyAt extends React.Component<StudyAtProps, StudyAtState> {
  render() {
    return (
      <div className={b(null)}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <Title size={TITLE_SIZE.SECOND} className={b('title')}>
                Study at MUSICABINET using any device
              </Title>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <picture>
                <source
                  srcSet="/images/background/footer.webp, /images/background/footer@2x.webp 2x"
                  type="image/webp"
                />
                <img
                  src="/images/background/footer.png"
                  srcSet="/images/background/footer@2x.png 2x"
                  className={b('background')}
                  alt="Musicabinet"
                />
              </picture>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <ButtonFreeTrial />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
