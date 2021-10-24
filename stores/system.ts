import { action, computed, makeObservable, observable } from 'mobx';
import { SERVICE_ID, SERVICE_NAME, SERVICE_SECOND_NEXT_MODULE } from '../constants';
import { LIST_ICON } from '../ui/common/icons';

export interface AboutServiceItemI {
  count: number | string;
  title: string;
  description: string;
}

export interface AboutService {
  [key: string]: AboutServiceItemI[];
}

export class SystemStore {
  @observable service_id = 0;
  @observable service_name: SERVICE_NAME | undefined = undefined;
  @observable instrument_id: number = 0;
  @observable instrument_name: string = '';
  @observable instrument_icon: LIST_ICON.GUITAR | LIST_ICON.KEYBOARD | LIST_ICON.SAXOPHONE = LIST_ICON.GUITAR;

  @observable selected_collection_id: number | undefined = undefined;
  @observable selected_course_id: number | undefined = undefined;
  @observable selected_module_id: number | undefined = undefined;
  @observable selected_group_lesson_id: number | undefined = undefined;

  @observable isLoadGeo: boolean = false;
  @observable currentCountry: string = '';
  @observable currencyConverter: number = 1;

  constructor(initialData: SystemStore | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  setServiceId(id: number) {
    this.service_id = id;
  }

  @action.bound
  setServiceName(name: SERVICE_NAME) {
    this.service_name = name;
  }

  @action.bound
  setInstrumentId(id: number) {
    this.instrument_id = id;
  }

  @action.bound
  setInstrumentName(name: string) {
    this.instrument_name = name;
  }

  @action.bound
  setInstrumentIcon(name: LIST_ICON.GUITAR | LIST_ICON.SAXOPHONE | LIST_ICON.KEYBOARD) {
    this.instrument_icon = name;
  }

  @action.bound
  setCollectionId(id: number) {
    this.selected_collection_id = id;
  }

  @action.bound
  setCourseId(id: number) {
    this.selected_course_id = id;
  }

  @action.bound
  setModuleId(id: number) {
    this.selected_module_id = id;
  }

  @action.bound
  setGroupLessonId(id: number) {
    this.selected_group_lesson_id = id;
  }

  @action.bound
  async getGEO() {
    try {
      const response = await fetch('https://ssl.geoplugin.net/json.gp?k=72bcdc86ca893e41');
      const responseJSON = await response.json();

      console.log('eheye', responseJSON);

      this.currentCountry = responseJSON.geoplugin_countryName;
      this.currencyConverter = responseJSON.geoplugin_currencyConverter;
      this.isLoadGeo = true;
    } catch (e) {
      console.error(`Error in method in getGEO : `, e);
    }
  }

  @computed
  get getCurrency() {
    return this.currentCountry === 'Russia' ? 'RUB' : 'USD';
  }

  @computed
  get showGroupLesson(): boolean {
    return this.selected_group_lesson_id !== undefined;
  }

  @computed
  get serviceNameLowerCase(): string {
    return this.service_name?.toLowerCase() || 'Not found';
  }

  @computed
  get title(): string {
    const title = {
      'school-saxophone': "Let's start your saxophone<br/> playing together",
      'school-keyboard': "Let's start your keyboard<br/> playing together",
      'school-guitar': "Let's start your music<br/> together",

      'college-saxophone': 'Take your saxophone<br/> playing to the next level',
      'college-keyboard': 'Take your keyboard playing to<br/> the next level',
      'college-guitar': 'Take your guitar playing to<br/> the next level',

      'university-saxophone': 'Become a saxophone<br/> professional',
      'university-keyboard': 'Become a keyboard<br/> professional',
      'university-guitar': 'Become a guitar<br/> professional'
    };
    // @ts-ignore
    return title[this.currentServiceInstrument] || 'Not found';
  }

  @computed
  get subTitle() {
    const subTitle = {
      'school-saxophone': 'Your Saxophone  |  The Internet  |  30+ min a day',
      'school-keyboard': 'Your Keyboard  |  The Internet  |  30+ min a day',
      'school-guitar': 'Your Guitar  |  The Internet  |  30+ min a day',

      'college-saxophone': 'Your Saxophone  |  The Internet  |  45+ min a day',
      'college-keyboard': 'Your Keyboard  |  The Internet  |  45+ min a day',
      'college-guitar': 'Your Guitar  |  The Internet  |  45+ min a day',

      'university-saxophone': 'Your Saxophone  |  The Internet  |  60+ min a day',
      'university-keyboard': 'Your Keyboard  |  The Internet  |  60+ min a day',
      'university-guitar': 'Your Guitar  |  The Internet  |  60+ min a day'
    };

    // @ts-ignore
    return subTitle[this.currentServiceInstrument] || 'Not found';
  }

  @computed
  get header() {
    const headers = {
      'school-saxophone': 'This saxophone school is for you if:',
      'school-keyboard': 'This keyboard school is for you if:',
      'school-guitar': 'This guitar school is for you if:',

      'college-saxophone': 'This saxophone college is for you if:',
      'college-keyboard': 'This keyboard college is for you if:',
      'college-guitar': 'This guitar college is for you if:',

      'university-saxophone': 'This saxophone university is for you if:',
      'university-keyboard': 'This keyboard university is for you if:',
      'university-guitar': 'This guitar university is for you if:'
    };

    // @ts-ignore
    return headers[this.currentServiceInstrument] || '';
  }

  @computed
  get columns() {
    const columns = {
      'school-guitar': [
        'You already know ho to hold the guitar in your hands, but understand that it is not enough.',
        'You can play several chords and want to move further.',
        'You want to play your favorite songs and compose your own ones.'
      ],
      'school-keyboard': [
        'You already know ho to hold the guitar in your hands, but understand that it is not enough.',
        'You can play several chords and want to move further.',
        'You want to play your favorite songs and compose your own ones.'
      ],
      'school-saxophone': [
        'You already know ho to hold the guitar in your hands, but understand that it is not enough.',
        'You can play several chords and want to move further.',
        'You want to play your favorite songs and compose your own ones.'
      ],

      'college-guitar': [
        'You want to play the guitar more consciously and technically',
        'You are thinking about obtaining systematic knowledge',
        'You strive to create new music using new methods and ways'
      ],
      'college-keyboard': [
        'You want to play the keyboard more consciously and technically',
        'You are thinking about obtaining systematic knowledge',
        'You strive to create new music using new methods and ways'
      ],
      'college-saxophone': [
        'You want to play the saxophone more consciously and technically',
        'You are thinking about obtaining systematic knowledge',
        'You strive to create new music using new methods and ways'
      ],

      'university-guitar': [
        "Your guitar level is alreday high enough, but you feel that you've hit the сeiling and can't move further to become a true professional",
        'You are willing to enhance your theoretical and practical guitar knowledge to the maximum extent',
        'You want to learn how to instantly improvise and compose absolutely unique music'
      ],
      'university-keyboard': [
        "Your keyboard level is alreday high enough, but you feel that you've hit the сeiling and can't move further to become a true professional",
        'You are willing to enhance your theoretical and practical keyboard knowledge to the maximum extent',
        'You want to learn how to instantly improvise and compose absolutely unique music'
      ],
      'university-saxophone': [
        "Your saxophone level is alreday high enough, but you feel that you've hit the сeiling and can't move further to become a true professional",
        'You are willing to enhance your theoretical and practical saxophone knowledge to the maximum extent',
        'You want to learn how to instantly improvise and compose absolutely unique music'
      ]
    };

    // @ts-ignore
    return columns[this.currentServiceInstrument] || [];
  }

  @computed
  get playingImage() {
    const data = {
      'school-saxophone': 'playing-saxophone-school',
      'school-keyboard': 'playing-keyboard-school',
      'school-guitar': 'playing-guitar-school',

      'college-saxophone': 'playing-saxophone-college',
      'college-keyboard': 'playing-keyboard-college',
      'college-guitar': 'playing-guitar-college',

      'university-saxophone': 'playing-saxophone-university',
      'university-keyboard': 'playing-keyboard-university',
      'university-guitar': 'playing-guitar-university'
    };

    // @ts-ignore
    return data[this.currentServiceInstrument] || '';
  }

  @computed
  get headerPlaying() {
    const data = {
      school: 'The beginning of a bright music journey ',
      college: 'Pursuing the bright music future',
      university: 'Pursuing the bright music future'
    };

    // @ts-ignore
    return data[this.service_name] || '';
  }

  @computed
  get textPlaying() {
    const data = {
      'school-saxophone': [
        'MUSICABINET | SAXOPHONE SCHOOL is made for those, who are eager to get high quality fundamental music education as fast as possible.',
        'It is for those, who want to invest their time & money into the future smartly without having to spend the last dime on it. '
      ],
      'school-keyboard': [
        'MUSICABINET | KEYS SCHOOL is made for those, who are eager to get high quality fundamental music education as fast as possible.',
        'It is for those, who want to invest their time & money into the future smartly without having to spend the last dime on it. '
      ],
      'school-guitar': [
        'MUSICABINET | GUITAR SCHOOL is made for those, who are eager to get high quality fundamental music education as fast as possible.',
        'It is for those, who want to invest their time & money into the future smartly without having to spend the last dime on it. '
      ],

      'college-saxophone': [
        'MUSICABINET | SAXOPHONE COLLEGE was created for those who want to get a fundamental musical education quickly and efficiently.',
        'This is a story for someone who is ready to wisely invest their time in their future, without giving up the last shirt.'
      ],
      'college-keyboard': [
        'MUSICABINET | KEYBOARD COLLEGE was created for those who want to get a fundamental musical education quickly and efficiently.',
        'This is a story for someone who is ready to wisely invest their time in their future, without giving up the last shirt.'
      ],
      'college-guitar': [
        'MUSICABINET | GUITAR COLLEGE was created for those who want to get a fundamental musical education quickly and efficiently.',
        'This is a story for someone who is ready to wisely invest their time in their future, without giving up the last shirt.'
      ],

      'university-saxophone': [
        'MUSICABINET | SAXOPHONE UNIVERSITY is made for those, who are striving to get the most out of fundamental music education in a systematic way.',
        'It is for those, who want to invest time & money into the future smartly in order to fullfill the dream of becoming a true professional.'
      ],
      'university-keyboard': [
        'MUSICABINET | KEYBOARD UNIVERSITY is made for those, who are striving to get the most out of fundamental music education in a systematic way.',
        'It is for those, who want to invest time & money into the future smartly in order to fullfill the dream of becoming a true professional.\n'
      ],
      'university-guitar': [
        'MUSICABINET | GUITAR UNIVERSITY is made for those, who are striving to get the most out of fundamental music education in a systematic way.',
        'It is for those, who want to invest time & money into the future smartly in order to fullfill the dream of becoming a true professional.'
      ]
    };

    // @ts-ignore
    return data[this.currentServiceInstrument] || [];
  }

  @computed
  get familiarHeader() {
    const data = {
      school: 'Get familiar with MUSICABINET | SCHOOL within 14 days',
      college: 'Get familiar with MUSICABINET | COLLEGE within 14 days',
      university: 'Get familiar with MUSICABINET | UNIVERSITY within 14 days'
    };

    // @ts-ignore
    return data[this.service_name] || '';
  }

  @computed
  get aboutService() {
    const data: AboutService = {
      school: [
        {
          count: 3,
          title: 'courses',
          description: 'Consists of 3 courses.  There are 6 modules in each course.'
        },
        {
          count: 149,
          title: 'lessons',
          description: 'A total of 149 lessons for studying music theory and practical exercises'
        },
        {
          count: 45,
          title: 'backing tracks',
          description: 'Practice to consolidate the knowledge gained or just for fun :-)'
        }
      ],
      college: [
        {
          count: 4,
          title: 'courses',
          description: 'Consists of 4 courses from simple to complex. Each course includes 4 modules.'
        },
        {
          count: 192,
          title: 'lessons',
          description: 'A total of 192 lessons for learning music theory and practice'
        },
        {
          count: 75,
          title: 'backing tracks',
          description: 'Practice to consolidate the knowledge gained or just for fun :-)'
        }
      ],
      university: [
        {
          count: 7,
          title: 'courses',
          description:
            'Consists of 7 courses (from simple to complex).  There are 5 educational modules and 2 improvisational modules in each course.'
        },
        {
          count: 1001,
          title: 'lessons',
          description: 'A total of 1001 lessons for studying music theory and practical exercises'
        },
        {
          count: '300+',
          title: 'backing tracks',
          description: 'Practice to consolidate the knowledge gained to become a real professional'
        }
      ]
    };

    // @ts-ignore
    return data[this.service_name] || [];
  }

  @computed
  get gadgetImage() {
    const paths = {
      school: '/images/gadjects/school-gadjects',
      college: '/images/gadjects/school-gadjects',
      university: '/images/gadjects/school-gadjects'
    };

    // @ts-ignore
    return paths[this.service_name] || '';
  }

  @computed
  get currentServiceInstrument(): string {
    return `${this.serviceNameLowerCase}-${this.instrument_name}`;
  }

  @computed
  get secondNextModule() {
    if (this.service_id) {
      if ([SERVICE_ID.SCHOOL, SERVICE_ID.COLLEGE, SERVICE_ID.UNIVERSITY].includes(this.service_id)) {
        // @ts-ignore
        return SERVICE_SECOND_NEXT_MODULE[this.service_id];
      }
    }
  }

  @action
  fillingStore(data: SystemStore) {
    const {
      service_id,
      service_name,
      instrument_id,
      instrument_name,
      instrument_icon,
      selected_collection_id,
      selected_course_id,
      selected_group_lesson_id,
      selected_module_id
    } = data;

    this.service_id = service_id;
    this.service_name = service_name;
    this.instrument_id = instrument_id;
    this.instrument_name = instrument_name;
    this.instrument_icon = instrument_icon;
    this.selected_collection_id = selected_collection_id;
    this.selected_course_id = selected_course_id;
    this.selected_group_lesson_id = selected_group_lesson_id;
    this.selected_module_id = selected_module_id;
  }
}
