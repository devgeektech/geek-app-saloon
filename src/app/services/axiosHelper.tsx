import { renderMessageToaster } from "../utils/common"


export function setupAxios(axios: any,store: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string,Saloon_id:any } }) => {
      const auth = localStorage.getItem('token')
      const saloon:any = store.getState().saloon;
      if (auth) {
        config.headers.Authorization = `${auth}`
        if(saloon.saloonId){
          config.headers.Saloon_id = `${saloon.saloonId}`
        }
      }
      return config
    },
    (err: any) => {
      Promise.reject(err)
    }
  )
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: any) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        window.localStorage.clear();
        renderMessageToaster("You are not authorized. Please log in again.", "error")
        window.location.href = "/auth/login"
      }
      
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      
      return Promise.reject(error.message);
    }
  );
}