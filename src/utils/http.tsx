import axios from 'axios';

export const getCommonHeaders = () => {
  const headers = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: localStorage.getItem("token") != null ? localStorage.getItem("token") : '',
  };

  return headers;
};

export const httpGet = async (url: string) => {
  return axios
    .get(url, {
      headers: getCommonHeaders()
    })
    .then((res: object) => {
      return res;
    })
    .catch((err: any) => {
      return err.res;
    });
};

export const httpDelete = async (url: string) => {
  return axios
    .delete(url, {
      headers: getCommonHeaders(),
    })
    .then((res: object) => {
      return res;
    })
    .catch((err: any) => {
      return err.res;
    });
};

export const httpPost = async (url: string, body: object) => {
  return axios
    .post(url, body, {  
      headers: getCommonHeaders(),
    })
    .then((res: object) => {
      return res;
    })
    .catch((err: any) => {
      return err.response;
    });
};

export const httpPut = async (url: string, body: object) => {
  return axios
    .put(url, body, {
      headers: getCommonHeaders(),
    })
    .then((res: object) => {
      return res;
    })
    .catch((err: any) => {
      return err.res;
    });
};

export const httpPostFormData = async (url: string, body: object) => {
  let commonHeaders: any = getCommonHeaders();
  delete commonHeaders.Accept;

  return axios
    .post(url, body, {  
      headers: commonHeaders,
    })
    .then((res: object) => {
      return res;
    })
    .catch((err: any) => {
      return err.response;
    });
};

export const httpPutFormData = async (url: string, body: object) => {
  let commonHeaders: any = getCommonHeaders();
  delete commonHeaders.Accept;

  return axios
    .put(url, body, {  
      headers: commonHeaders,
    })
    .then((res: object) => {
      return res;
    })
    .catch((err: any) => {
      return err.response;
    });
};