/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import noUiSlider, { target } from 'nouislider'
import { useLayout } from '../../core'
// import { KTIcon } from "../../../helpers";
// import { DefaultTitle } from "./page-title/DefaultTitle";
// import { ThemeModeSwitcher } from "../../../partials";
import Dropdown from 'react-bootstrap/Dropdown'
import '../../components/aside/AsideToolbar.scss'
import LoginIcon from '../../../images/M1_S3_3.png'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../app/redux/reducer/authSlice'
import { toast } from 'react-toastify'

const HeaderToolbar = () => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logout())
    localStorage.clear()
  }

  return (
    <div className='toolbar d-flex align-items-center justify-content-between w-100'>
      {/* begin::Toolbar container */}
      <div className='inr-dropdown-location'>
        {/* <Dropdown>
          <Dropdown.Toggle
            className='bg-transparent text-dark location-dorpdown'
            id='dropdown-basic'
          >

          
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
      <div className='inr-dropdown-login'>
        <Dropdown>
          <Dropdown.Toggle
            className='bg-transparent text-dark location-dorpdown'
            id='dropdown-basic'
          >
            <div className='inr-log-out row gap-1 align-items-center'>
              <div className='loginWrap d-flex align-items-center'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='log-out-left'>
                    <img src={LoginIcon} alt='LoginIcon' />
                  </div>
                  <h5 className=' ms-lg-2'>Admin</h5>
                </div>
                {/* <button onClick={logOut} className='btn btn-sm btn-danger ms-lg-2'>Logout</button> */}
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
            <Dropdown.Item >Profile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export { HeaderToolbar }
