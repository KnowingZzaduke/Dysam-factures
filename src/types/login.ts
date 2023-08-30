export interface TypeSigning {
  username: string;
  password: string;
}

export interface UserDataSuccess{
  salida: "exito"
  user: string,
  level: number,
  iduser: number
}

export interface UserDataError{
  salida: "error",
  data: string
}

export type UserData = UserDataSuccess | UserDataError

export interface SigninResponse {
  data: DataSigninResponse;
  status: number;
  statusText: string;
  headers: SigninResponseHeaders;
  config: ConfigSigninResponse;
  request: RequestSigninResponse;
}

export interface ConfigSigninResponse {
  transitional: TransitionalSigninResponse;
  adapter: string[];
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: RequestSigninResponse;
  headers: ConfigHeadersSigninResponse;
  method: string;
  url: string;
  data: RequestSigninResponse;
}

export interface RequestSigninResponse {}

export interface ConfigHeadersSigninResponse {
  Accept: string;
  "Content-Type": boolean;
}

export interface TransitionalSigninResponse {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface DataSigninResponse {
  salida: string;
  data: string;
  result: string;
}

export interface SigninResponseHeaders {
  "content-length": string;
  "content-type": string;
}
