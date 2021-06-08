export const STRIPE_PRICES: { [key: string]: string } = {
  school_guitar_1: 'price_1IzeXVHTf8fYJsx5dWO88a6Z',
  school_guitar_3: 'price_1IzeWxHTf8fYJsx5V3BkXGUY',
  school_guitar_6: 'price_1IzeUkHTf8fYJsx5SIfCrYeL',

  school_keys_1: 'price_1IzepZHTf8fYJsx5vG1Vnitk',
  school_keys_3: 'price_1IzeopHTf8fYJsx5vrFAlxwS',
  school_keys_6: 'price_1IzenfHTf8fYJsx5WDNAuw2W',

  school_sax_1: 'price_1IzevkHTf8fYJsx55wnEQwUQ',
  school_sax_3: 'price_1IzeuPHTf8fYJsx56dIm1Y0e',
  school_sax_6: 'price_1IzetoHTf8fYJsx5aDaSohAs',

  college_guitar_1: 'price_1IzeZjHTf8fYJsx5qbkXV6aN',
  college_guitar_6: 'price_1IzeZAHTf8fYJsx5XFQV1eiq',
  college_guitar_12: 'price_1IzeYQHTf8fYJsx5PM2hFLkg',

  college_keys_1: 'price_1HpAL2HTf8fYJsx5xEpb2qD8',
  college_keys_6: 'price_1HpAK3HTf8fYJsx508GXG2mk',
  college_keys_12: 'price_1HpAJYHTf8fYJsx5pQg2FLU9',

  college_sax_1: 'price_1HpAPqHTf8fYJsx5cFUx3B1A',
  college_sax_6: 'price_1HpAP9HTf8fYJsx5ZQrnlrxf',
  college_sax_12: 'price_1HpAOZHTf8fYJsx5vxEIUHz2'
};

export const getStripePrice = (key = '') => {
  if (STRIPE_PRICES.hasOwnProperty(key)) {
    return STRIPE_PRICES[key];
  } else {
    console.warn('Not found key in PRICE');
  }
};
