/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useLayout} from '../../core'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {Link} from 'react-router-dom'
import {AsideMenu} from './AsideMenu'
import {AsideToolbar} from './AsideToolbar'

const AsideDefault: FC = () => {
  const {classes} = useLayout()

  return (
    <div
      id='kt_aside'
      className='aside'
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Aside Toolbarl */}
      <div className='aside-toolbar flex-column-auto' id='kt_aside_toolbar'>
        {/* begin::Brand */}
      <div className='header-brand text-center'>
        {/* begin::Logo */}
        <Link to='/'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/misc/Logo_Cleaned.png')}
            className='h-45px h-lg-45px'
          />
        </Link>
        {/* end::Logo */}
        </div>
        <AsideToolbar />
      </div>
      {/* end::Aside Toolbarl */}
      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

      {/* begin::Footer */}
      <div className='aside-footer flex-column-auto py-5' id='kt_aside_footer'>
        {/* <a
          className='btn btn-custom btn-primary w-100'
          target='_blank'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL}
          data-bs-toggle='tooltip'
          data-bs-trigger='hover'
          data-bs-dismiss-='click'
          title='Check out the complete documentation with over 100 components'
        >
          <span className='btn-label'>Docs & Components</span>
          <span className=' btn-icon fs-2'>
            <KTIcon iconName='document' />
          </span>
        </a> */}
      </div>
      {/* end::Footer */}
    </div>
  )
}

export {AsideDefault}
