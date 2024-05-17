import {FC, lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {AppointmentWrapper} from '../pages/appointment/appointmentWrapper'
import {UsersWrapper} from '../pages/users/usersWrappers'
import {ServiceWrapper} from '../pages/services/serviceWrapper'
import {CouponsWrapper} from '../pages/coupons'
import {RevenueWrapper} from '../pages/revenue'
import {SettingWrapper} from '../pages/setting/settingWrapper'
import {BannerWrapper} from '../pages/banner/Banner'
import {ShopWrapper} from '../pages/vendors/Vendor'
import {EditUser} from '../pages/users/editUser'
import {AddBanner} from '../pages/banner/AddBanner'

const PrivateRoutes = () => {
  //const UsersWrapper = lazy(() => import('../pages/users/usersWrappers'))
  //const ServiceWrapper = lazy(() => import('../pages/services/serviceWrapper'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/users/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route
          path='builder'
          element={
            <SuspensedView>
              <BuilderPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='appointment'
          element={
            <SuspensedView>
              <AppointmentWrapper />
            </SuspensedView>
          }
        />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route path='users'>
          <Route
            index={true}
            element={
              <SuspensedView>
                <UsersWrapper />
              </SuspensedView>
            }
          ></Route>

          <Route path='edit/:id' element={<EditUser />} />
        </Route>
        <Route path='services'>
          <Route
            index={true}
            element={
              <SuspensedView>
                <ServiceWrapper />
              </SuspensedView>
            }
          ></Route>
        </Route>
        <Route
          path='coupons'
          element={
            <SuspensedView>
              <CouponsWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='revenue'
          element={
            <SuspensedView>
              <RevenueWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='setting'
          element={
            <SuspensedView>
              <SettingWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route path='banner'>
          <Route
            index={true}
            element={
              <SuspensedView>
                <BannerWrapper />
              </SuspensedView>
            }
          ></Route>
          {/* <Route path='add' element={<AddBanner />} /> */}
        </Route>
        <Route
          path='vendor'
          element={
            <SuspensedView>
              <ShopWrapper />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
