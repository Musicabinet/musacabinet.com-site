import { action, computed, makeObservable, observable } from 'mobx';
import { GeoPluginI } from '../interfaces';

export class GeoPluginStore implements GeoPluginI {

  @observable geoplugin_request = '';
  @observable geoplugin_status = 0;
  @observable geoplugin_delay = '';
  @observable geoplugin_credit = '';
  @observable geoplugin_city = '';
  @observable geoplugin_region = '';
  @observable geoplugin_regionCode = '';
  @observable geoplugin_regionName = '';
  @observable geoplugin_areaCode = '';
  @observable geoplugin_dmaCode = '';
  @observable geoplugin_countryCode = '';
  @observable geoplugin_countryName = '';
  @observable geoplugin_inEU = 0;
  @observable geoplugin_euVATrate = false;
  @observable geoplugin_continentCode = '';
  @observable geoplugin_continentName = '';
  @observable geoplugin_latitude = '';
  @observable geoplugin_longitude = '';
  @observable geoplugin_locationAccuracyRadius = '';
  @observable geoplugin_timezone = '';
  @observable geoplugin_currencyCode = '';
  @observable geoplugin_currencySymbol = '';
  @observable geoplugin_currencySymbol_UTF8 = '';
  @observable geoplugin_currencyConverter = 0;

  constructor(initialData: GeoPluginStore | GeoPluginI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillStore(initialData);
    }
  }

  @action.bound
  async getCurrent() {

    if (this.geoplugin_continentName) {
      return false;
    }

    console.log('connect');

    try {
      const response: Response = await fetch(`https://ssl.geoplugin.net/json.gp?k=a2b4f3646f77ea13`);
      const data: GeoPluginI = await response.json();

      this.fillStore(data);
    } catch (e) {
      console.error(`Error in method GeoPluginStore.getCurrent : `, e);
    }
  }

  @computed
  get isRussia(): boolean {
    return this.geoplugin_countryName === 'Russia';
  }

  @action
  fillStore(data: GeoPluginStore | GeoPluginI) {
    const {
      geoplugin_request,
      geoplugin_status,
      geoplugin_delay,
      geoplugin_credit,
      geoplugin_city,
      geoplugin_region,
      geoplugin_regionCode,
      geoplugin_regionName,
      geoplugin_areaCode,
      geoplugin_dmaCode,
      geoplugin_countryCode,
      geoplugin_countryName,
      geoplugin_inEU,
      geoplugin_euVATrate,
      geoplugin_continentCode,
      geoplugin_continentName,
      geoplugin_latitude,
      geoplugin_longitude,
      geoplugin_locationAccuracyRadius,
      geoplugin_timezone,
      geoplugin_currencyCode,
      geoplugin_currencySymbol,
      geoplugin_currencySymbol_UTF8,
      geoplugin_currencyConverter
    } = data;

    this.geoplugin_request = geoplugin_request;
    this.geoplugin_status = geoplugin_status;
    this.geoplugin_delay = geoplugin_delay;
    this.geoplugin_credit = geoplugin_credit;
    this.geoplugin_city = geoplugin_city;
    this.geoplugin_region = geoplugin_region;
    this.geoplugin_regionCode = geoplugin_regionCode;
    this.geoplugin_regionName = geoplugin_regionName;
    this.geoplugin_areaCode = geoplugin_areaCode;
    this.geoplugin_dmaCode = geoplugin_dmaCode;
    this.geoplugin_countryCode = geoplugin_countryCode;
    this.geoplugin_countryName = geoplugin_countryName;
    this.geoplugin_inEU = geoplugin_inEU;
    this.geoplugin_euVATrate = geoplugin_euVATrate;
    this.geoplugin_continentCode = geoplugin_continentCode;
    this.geoplugin_continentName = geoplugin_continentName;
    this.geoplugin_latitude = geoplugin_latitude;
    this.geoplugin_longitude = geoplugin_longitude;
    this.geoplugin_locationAccuracyRadius = geoplugin_locationAccuracyRadius;
    this.geoplugin_timezone = geoplugin_timezone;
    this.geoplugin_currencyCode = geoplugin_currencyCode;
    this.geoplugin_currencySymbol = geoplugin_currencySymbol;
    this.geoplugin_currencySymbol_UTF8 = geoplugin_currencySymbol_UTF8;
    this.geoplugin_currencyConverter = geoplugin_currencyConverter;
  }

}
