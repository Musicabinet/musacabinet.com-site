export const STRIPE_PRICES: { [key: string]: string } = {
  school_guitar_1: 'price_1HouDuHTf8fYJsx5Rc1RlU5y',
  school_guitar_3: 'price_1HouFbHTf8fYJsx59pOaJBp7',
  school_guitar_6: 'price_1HouGgHTf8fYJsx5SyGE1WpG',

  school_keys_1: 'price_1HpAITHTf8fYJsx54kyeAYBs',
  school_keys_3: 'price_1HpAHnHTf8fYJsx5X6CtiU4o',
  school_keys_6: 'price_1HpAH0HTf8fYJsx57XXrFRy6',

  school_sax_1: 'price_1HpANlHTf8fYJsx5wGFItLNl',
  school_sax_3: 'price_1HpAN5HTf8fYJsx53tfblIU5',
  school_sax_6: 'price_1HpAMPHTf8fYJsx5hynugpD8',

  college_guitar_1: 'price_1IzeZjHTf8fYJsx5qbkXV6aN',
  college_guitar_6: 'price_1IzeYQHTf8fYJsx5PM2hFLkg',
  college_guitar_12: 'price_1IzeZAHTf8fYJsx5XFQV1eiq',

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
