import { Cookie } from './cookies';
import { METHODS_REQUEST } from '../constants';
import FormData from 'form-data';

class APIWrapper {
  public async request<T>(url: string = '', options = {}): Promise<T> {
    const cookie = Cookie.getInstance();

    let defaultOptions = {
      method: METHODS_REQUEST.GET,
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
        'x-requested-with': 'XMLHttpRequest'
      }
    };

    options = { ...defaultOptions, ...options };

    const result = await fetch(`${API_URL}${url}`, options);
    const response = await result.json();

    if (!result.ok) {
      throw response;
    }

    return response;
  }

  public getFormData(data: any) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item: any) => {
          formData.append(`${key}[]`, JSON.stringify(item));
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    return formData;
  }
}

export const API = new APIWrapper();
