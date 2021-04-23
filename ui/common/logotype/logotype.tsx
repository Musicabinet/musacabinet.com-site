import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './logotype.module.sass';
import { ImagePNG } from '../image-png/image-png';
import Link from 'next/link';

const b = block(style);

type LogotypeProps = {};
type LogotypeState = {};

@inject(() => ({}))
@observer
export class Logotype extends React.Component<LogotypeProps, LogotypeState> {
  render() {
    return (
      <Link href={'/'}>
        <a className={b('link')}>
        <ImagePNG path={'/images/logotype/common'} className={b(null)} alt={'Musicabinet online school'} />
        </a>
      </Link>
    );
  }
}
