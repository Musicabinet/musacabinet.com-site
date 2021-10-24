export interface CloudPaymentOptionsI {
  publicId: string;
  description: string;
  amount: number;
  currency: string;
  accountId: string;
  skin: string;
  data: object;
  isLongDesc: boolean;
  auth: boolean;
}

export interface CloudPaymentPaymentResult {
  success: boolean;
  message: null | string;
  code: string;
}
