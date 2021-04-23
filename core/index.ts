import Router from "next/router";

export {API} from './api';
export {Cookie} from './cookies';


export const redirectToWrapper = async (res: any, url: string) => {
  if (typeof window === 'undefined') {
    if (res) {
      res.writeHead(302, {Location: `${url}`});
      res.end();
    }
  } else {
    await Router.push(`${url}`);
  }
}
