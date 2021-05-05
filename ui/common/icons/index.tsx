import ICON_COLLEGE from './college-v2.svg';
import ICON_SCHOOL from './school-v2.svg';
import ICON_UNIVERSITY from './university-v2.svg';
import ICON_FORM_1 from './form_1.svg';
import ICON_FORM_2 from './form_2.svg';
import ICON_FORM_3 from './form_3.svg';
import ICON_STEP_1 from './step_1.svg';
import ICON_STEP_2 from './step_2.svg';
import ICON_STEP_3 from './step_3.svg';
import ICON_GUITAR from './guitar.svg';
import ICON_SAXOPHONE from './sax.svg';
import ICON_KEYBOARD from './keyboards.svg';
import ICON_CONTACT from './contact.svg';
import ICON_BACK from './back.svg';
import ICON_PLAY from './play.svg';
import ICON_VOLUME from './icon-volume.svg';
import ICON_BACK_BUTTON from './icon-back.svg';
import ICON_PROFILE from './profile-icon.svg';
import React from 'react';
import { ReactSVG } from 'react-svg';

export enum LIST_ICON {
  COLLEGE = 'COLLEGE',
  SCHOOL = 'SCHOOL',
  UNIVERSITY = 'UNIVERSITY',
  FORM_1 = 'FORM_1',
  FORM_2 = 'FORM_2',
  FORM_3 = 'FORM_3',
  STEP_1 = 'STEP_1',
  STEP_2 = 'STEP_2',
  STEP_3 = 'STEP_3',
  GUITAR = 'GUITAR',
  SAXOPHONE = 'SAXOPHONE',
  KEYBOARD = 'KEYBOARD',
  CONTACT = 'CONTACT',
  BACK = 'BACK',
  PLAY = 'PLAY',
  VOLUME = 'VOLUME',
  BACK_BUTTON = 'BACK_BUTTON',
  PROFILE = 'PROFILE',
}

export const ICON_MAPPING = {
  [LIST_ICON.COLLEGE]: ICON_COLLEGE,
  [LIST_ICON.SCHOOL]: ICON_SCHOOL,
  [LIST_ICON.UNIVERSITY]: ICON_UNIVERSITY,
  [LIST_ICON.FORM_1]: ICON_FORM_1,
  [LIST_ICON.FORM_2]: ICON_FORM_2,
  [LIST_ICON.FORM_3]: ICON_FORM_3,
  [LIST_ICON.STEP_1]: ICON_STEP_1,
  [LIST_ICON.STEP_2]: ICON_STEP_2,
  [LIST_ICON.STEP_3]: ICON_STEP_3,
  [LIST_ICON.GUITAR]: ICON_GUITAR,
  [LIST_ICON.SAXOPHONE]: ICON_SAXOPHONE,
  [LIST_ICON.KEYBOARD]: ICON_KEYBOARD,
  [LIST_ICON.CONTACT]: ICON_CONTACT,
  [LIST_ICON.BACK]: ICON_BACK,
  [LIST_ICON.PLAY]: ICON_PLAY,
  [LIST_ICON.VOLUME]: ICON_VOLUME,
  [LIST_ICON.BACK_BUTTON]: ICON_BACK_BUTTON,
  [LIST_ICON.PROFILE]: ICON_PROFILE
};

export const getIcon = (icon: LIST_ICON, className: string): React.ReactNode => {
  if (ICON_MAPPING[icon]) {
    return <ReactSVG src={ICON_MAPPING[icon]} className={`${className}`} />;
  } else {
    console.error(`Not found icon : ${icon}`);
    return null;
  }
};
