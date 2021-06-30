import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './types.module.sass';
import { TERM_LIST } from '../../../../interfaces';
import { TypeButton } from './type-button';

const b = block(style);

type TypesProps = {};
type TypesState = {};

@inject(() => ({}))
@observer
export class Types extends React.Component<TypesProps, TypesState> {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className={b(null)}>
              {Object.keys(TERM_LIST).map((term) => {
                return <TypeButton key={term}>{term}</TypeButton>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
