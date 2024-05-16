/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import './AuthLayout.scss'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid for-mob-back'>
      <div
        className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'
        style={{backgroundImage: `url(${toAbsoluteUrl('/media/misc/M1_S1_2.png')})`}}
      >
        <div className='logo-upr'>
          <Link to='/' className='mb-0'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/misc/Logo_Cleaned.png')}
              className='Brand-logo'
            />
          </Link>
        </div>
        <div className='d-flex flex-center flex-column flex-lg-row-fluid position-relative'>
          <div className='form-width'>
            <Outlet />
          </div>
        </div>
      </div>
      <div
        className='for-mob-hide d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{backgroundImage: `url(${toAbsoluteUrl('/media/misc/M1_S1_1.png')})`}}
      >
        <div className='d-flex flex-column flex-center py-lg-15 w-100'>
          <div className='inner-back-gold-clr px-5 px-md-15 text-center'>
            <Link to='/' className='mb-0'>
              <img
                className='mx-auto w-sm-50 w-lg-auto'
                src={toAbsoluteUrl('/media/misc/Logo_Cleaned.png')}
                alt=''
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export {AuthLayout}
