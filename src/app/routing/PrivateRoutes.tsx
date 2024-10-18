import { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { AppointmentWrapper } from '../pages/appointment/appointmentWrapper'
import { UsersWrapper } from '../pages/users/usersWrappers'
import { ServiceWrapper } from '../pages/services/serviceWrapper'
import { CouponsWrapper } from '../pages/coupons'
import { RevenueWrapper } from '../pages/revenue'
import { SettingWrapper } from '../pages/setting/settingWrapper'
import { BannerWrapper } from '../pages/banner/Banner'
import { ShopWrapper } from '../pages/vendors/Vendor'
import { StaffWrapper } from '../pages/staff/Staff'
import { AvailabilityAppointment } from '../pages/appointment/availabilityAppoint,ment'
import { SaloonWrapper } from '../pages/saloon'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/saloon' />} />
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
        <Route
          path='/appointment/availability'
          element={
            <SuspensedView>
              <AvailabilityAppointment/>
            </SuspensedView>
          }
        />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='users'>
          <Route
            index={true}
            element={
              <SuspensedView>
                <UsersWrapper />
              </SuspensedView>
            }
          ></Route>

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
          path='saloon'
          element={
            <SuspensedView>
              <SaloonWrapper />
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
        <Route path='banner'>
          <Route
            index={true}
            element={
              <SuspensedView>
                <BannerWrapper />
              </SuspensedView>
            }
          ></Route>
        </Route>
        <Route path='staff'>
          <Route
            index={true}
            element={
              <SuspensedView>
                <StaffWrapper/>
              </SuspensedView>
            }
          ></Route>
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

const SuspensedView: FC<WithChildren> = ({ children }) => {
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

export { PrivateRoutes }
