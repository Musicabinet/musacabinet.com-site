export interface FacebookClientResponsive {
  accessToken: string,
  data_access_expiration_time: number,
  expiresIn: number,
  graphDomain: string,
  id: string,
  name: string,
  signedRequest: string,
  userID: string
}

export * from './auth';
