import React from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import Jhondeo from '../../../_metronic/images/jhonDeo.svg'
import '../../pages/users/userStyle.scss'

export default function SingleUser(props:any) {
  let user = props?.user;
  return (
    <>
      <div className='d-flex align-items-center gap-4 user-details-deo py-5'>
        <a href='#' className='back-arrow'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='22'
            viewBox='0 0 25 22'
            fill='none'
          >
            <path
              d='M10.3077 20L2 11L10.3077 2M3.15385 11H23'
              stroke='#131C1B'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
        <div className='usr-img'>
          <img src={Jhondeo} />
        </div>
        <div className='user-details'>
          <h3>{user?.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>
      <div className='customer-details d-md-flex align-items-start gap-5 py-5'>
        <div className='cust-detail'>
            <p>Customer ID :<span>545151511451</span></p>
            <p>Email ID :<span>joedoe123@joedoe</span></p>
        </div>
        <div className='cust-detail'>
            <p className='d-block'>Most visited Salon :<span className='px-2'>Cleaned Salon, Elgin Road</span></p>
        </div>
        <div className='cust-detail'>
            <p className='d-block'>Total Services :<span className='px-2'>80</span></p>
        </div>
      </div>
    </>
  )
}
