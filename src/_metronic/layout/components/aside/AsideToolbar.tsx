import {useAuth} from '../../../../app/modules/auth'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu, Search} from '../../../partials'
import './AsideToolbar.scss'

/* eslint-disable jsx-a11y/anchor-is-valid */
const AsideToolbar = () => {
  const {currentUser} = useAuth()

  return (
    <>
      {/*begin::User*/}
      <div className='aside-user d-flex align-items-sm-center justify-content-center py-0'>
        {/*begin::Symbol*/}
        <div className='border-gradient'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='234'
            height='1'
            viewBox='0 0 234 1'
            fill='none'
          >
            <path d='M0 0.5H233.25' stroke='url(#paint0_linear_270_2183)' />
            <defs>
              <linearGradient
                id='paint0_linear_270_2183'
                x1='0'
                y1='0.5'
                x2='231'
                y2='0.5'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopOpacity={0} />
                <stop offset='0.5' />
                <stop offset='1' stopOpacity={0.15625} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/*end::Symbol*/}

        {/*begin::Wrapper*/}

        {/*end::Wrapper*/}
      </div>
      {/*end::User*/}

      {/*begin::Aside search*/}

      {/*end::Aside search*/}
    </>
  )
}

export {AsideToolbar}
