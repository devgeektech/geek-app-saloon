export function setupAxios(axios: any) {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use(
      (config: {headers: {Authorization: string}}) => {
        const auth = localStorage.getItem('token')
        if (auth) {
          config.headers.Authorization = `${auth}`
        }
        return config
      },
      (err: any) => Promise.reject(err)
    )
  }