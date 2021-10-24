import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './fourth-block.module.sass';
import { Title } from '../../../common';
import { TITLE_SIZE } from '../../../../constants';

const b = block(style);

type FourthBlockProps = {};
type FourthBlockState = {};

@inject(() => ({}))
@observer
export class FourthBlock extends React.Component<FourthBlockProps, FourthBlockState> {
  render() {
    return (
      <div className={b(null)}>
        <div className="container g-lg-0">
          <div className="row g-lg-0">
            <div className="col-lg-12">
              <Title size={TITLE_SIZE.SECOND} isServiceColor className={b('header')}>
                Daily practice — solid results
              </Title>
            </div>
          </div>

          <div className="row g-lg-0">
            <div className="col-lg-5">
              <picture>
                <source
                  srcSet={`/images/daily-practice/circle-of-fifths.webp, /images/daily-practice/circle-of-fifths@2x.webp 2x`}
                  type="image/webp"
                />
                <img
                  src={`/images/daily-practice/circle-of-fifths.jpg`}
                  srcSet={`/images/daily-practice/circle-of-fifths@2x.jpg 2x`}
                />
              </picture>
            </div>
            <div className="col-lg-7">
              <Title size={TITLE_SIZE.FOURTH}>
                We adhere to the theory of small steps that allow us to achieve big goals.
              </Title>

              <ul className={b('list')}>
                <li className={b('item')}>
                  Determine the time you are willing to devote to the studying with the program.
                </li>
                <li className={b('item')}>Select any lesson from the Grand Chart.</li>
                <li className={b('item')}>
                  The system will guide you throughout the learning materials like a mentor. From simple to complex.
                </li>
                <li className={b('item')}>
                  You will learn to play your favorite music, improvise and create your own.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
