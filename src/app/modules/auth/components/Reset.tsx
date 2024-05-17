import {useState} from 'react'
import clsx from 'clsx'

export function ResetPassword() {
  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
    >
      <div className='text-start mb-10'>
        <h1 className='text-dark fw-bolder mb-3'>Password Reset</h1>
      </div>
      <div className='fv-row mb-8'>
        <div className='mb-8'>
          <label className='form-label'>Enter new Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            autoComplete='off'
            className={clsx(
              'form-control bg-transparent'
              // {'is-invalid': formik.touched.email && formik.errors.email},
              // {
              //   'is-valid': formik.touched.email && !formik.errors.email,
              // }
            )}
          />
        </div>
        <div className='mb-12'>
          <label className='form-label '>Re enter Password</label>
          <input
            type='password'
            placeholder='Re enter password'
            autoComplete='off'
            className={clsx('form-control bg-transparent')}
          />
        </div>
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'></span>
          </div>
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
