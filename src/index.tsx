import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
import './_metronic/assets/scss/global.scss'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import 'react-toastify/dist/ReactToastify.css'
import {AppRoutes} from './app/routing/AppRoutes'
import {setupAxios} from './app/services/axiosHelper'
import Toster from '../src/app/utils/toaster'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, store} from './app/redux/store'
import { Store } from 'redux';
import 'react-calendar/dist/Calendar.css';

setupAxios(axios,store)
Chart.register(...registerables)

// const queryClient = new QueryClient();
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toster />
        <AppRoutes />
      </PersistGate>
    </Provider>
  )
}
//  <QueryClientProvider client={queryClient}>
//    <MetronicI18nProvider>
//      <AuthProvider>
//        <Toster />
//        <AppRoutes />
//      </AuthProvider>
//    </MetronicI18nProvider>
//    <ReactQueryDevtools initialIsOpen={false} />
//  </QueryClientProvider>;
