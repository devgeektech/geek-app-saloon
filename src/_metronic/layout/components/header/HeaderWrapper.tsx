/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'
import {HeaderToolbar} from './HeaderToolbar'
import { useSelector } from 'react-redux'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {aside} = config;
  const { saloonId } = useSelector((state: any) => state.saloon);

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      {/* begin::Brand */}
      <div className='header-brand'>
        {/* begin::Logo */}
        <Link to='/'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/misc/Logo_Cleaned.png')}
            className='h-45px h-lg-45px'
          />
        </Link>
        {/* end::Logo */}

        {saloonId && aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-minimize'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTIcon iconName='exit-left' className='fs-1 me-n1 minimize-default' />
            <KTIcon iconName='entrance-left' className='fs-1 minimize-active' />
          </div>
        )}

        {/* begin::Aside toggle */}
        <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-30px h-30px'
            id='kt_aside_mobile_toggle'
          >
            <KTIcon iconName='abstract-14' className='fs-1' />
          </div>
        </div>
        {/* end::Aside toggle */}
      </div>
      {/* end::Brand */}
      <HeaderToolbar />
    </div>
  )
}
