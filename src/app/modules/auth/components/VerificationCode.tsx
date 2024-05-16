import {useState} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'


export function Verificaiton() {
  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
    >
      <div className='text-start mb-10'>
        <h1 className='text-dark fw-bolder mb-3'>Verification</h1>
        <div className='text-gray-500 fw-semibold fs-6 discrption'>
        Enter the code from the email we sent to q***xxe@dfur.com
        </div>
      </div>
      <div className='w-100 '>
        <div className='inr-timer mt-3 mb-7'>
            <h5>02:32</h5>
        </div>
        <div className='inner-otp-fields d-flex mb-12 gap-3 justify-content-center'>
            <input type='number' min={1} max={1} className='form-control'></input>
            <input type='number' min={1} max={1} className='form-control'></input>
            <input type='number' min={1} max={1} className='form-control'></input>
            <input type='number' min={1} max={1} className='form-control'></input>
            <input type='number' min={1} max={1} className='form-control'></input>
            <input type='number' min={1} max={1} className='form-control'></input>
        </div>
      </div>
      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button type='submit' id='kt_password_reset_submit' className='w-100 blackBtn'>
          <span className='indicator-label'>Continue</span>
        </button>
      </div>
    </form>
  )
}
