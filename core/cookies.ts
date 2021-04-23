import {parseCookies, setCookie, destroyCookie} from 'nookies';

export class Cookie {

  private static instance: Cookie;
  cxt: null | any;

  private constructor() {
  }

  public static getInstance(): Cookie {
    if (!Cookie.instance) {
      Cookie.instance = new Cookie();
    }

    return Cookie.instance;
  }

  init(ctx: any) {
    this.cxt = ctx;
  }

  set(key: string, value: string) {
    if (!process.browser) {
      setCookie(this.cxt, key, value, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60
      });
    } else {
      setCookie(null, key, value, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60
      });
    }
  }

  get(key: string) {
    let objCookie = parseCookies(this.cxt);
    if (objCookie.hasOwnProperty(key)) {
      return objCookie[key];
    }
    return '';
  }

  remove(key: string, path = '/') {
    let options: any = {};
    if (path.length > 0) {
      options.path = path;
    }

    if (!process.browser) {
      destroyCookie(this.cxt, key, options);
    } else {
      destroyCookie(null, key, options);
    }
  }

}
