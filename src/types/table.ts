export interface DataTableResponse {
    data:       Data;
    status:     number;
    statusText: string;
    headers:    DataTableResponseHeaders;
    config:     Config;
    request:    Request;
}

export interface Config {
    transitional:      Transitional;
    adapter:           string;
    transformRequest:  null[];
    transformResponse: null[];
    timeout:           number;
    xsrfCookieName:    string;
    xsrfHeaderName:    string;
    maxContentLength:  number;
    maxBodyLength:     number;
    env:               Request;
    headers:           ConfigHeaders;
    method:            string;
    url:               string;
}

export interface Request {
}

export interface ConfigHeaders {
    Accept:         string;
    "Content-Type": null;
}

export interface Transitional {
    silentJSONParsing:   boolean;
    forcedJSONParsing:   boolean;
    clarifyTimeoutError: boolean;
}

export interface Data {
    salida: string;
    data:   Datum[];
}

export interface Datum {
    id_files:    number;
    file_path:   string;
    id_user:     string;
    user_name:   string;
    date:        Date;
    comment:     string;
    status_file: string;
}

export interface DataTableResponseHeaders {
    "content-length": string;
    "content-type":   string;
}
