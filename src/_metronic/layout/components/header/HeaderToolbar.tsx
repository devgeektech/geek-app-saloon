/* eslint-disable jsx-a11y/anchor-is-valid */
import Dropdown from 'react-bootstrap/Dropdown'
import '../../components/aside/AsideToolbar.scss'
import LoginIcon from '../../../images/M1_S3_3.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../app/redux/reducer/authSlice'
import { setSaloonId } from '../../../../app/redux/reducer/saloonSlice'
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom'
import { DASHBOARD, USERS, VENDOR } from '../../../../app/utils/const'
import { setModalStatus, setToken } from '../../../../app/redux/reducer/helperSlice'

const HeaderToolbar = () => {
  const dispatch = useDispatch()
  const { saloonList, saloonId } = useSelector((state: any) => state.saloon);
  const location = useLocation()
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout())
    dispatch(setToken(''))
    dispatch(setSaloonId(''))
    localStorage.clear()
  }

  const changeSaloon = () => {
    navigate('/saloon')
    dispatch(setModalStatus(true))
  }

  // const handleSelect = (event: any) => {
  //   const saloonID = event.target.value;
  //   dispatch(setSaloonId(saloonID))
  //   localStorage.setItem('saloonId', saloonID);
  // };

  return (
    <div className='toolbar d-flex align-items-center justify-content-end w-100'>
      <div className='inr-dropdown-location me-4'>

        {/* {((location?.pathname !== DASHBOARD) && (location?.pathname !== USERS) && ((location?.pathname !== VENDOR))) &&
          (<Form.Select className='' size="sm" value={saloonId} onChange={handleSelect}>
            <option value="">Select Saloon</option>
            {saloonList?.length > 0 && (
              saloonList?.map((saloon: any) => (
                <option key={saloon._id} value={saloon._id}>
                  {saloon.name}
                </option>
              ))
            )}
          </Form.Select>)
        } */}

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
            <Dropdown.Item >Profile</Dropdown.Item>
            <Dropdown.Item onClick={changeSaloon}>Change Saloon</Dropdown.Item>
            <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export { HeaderToolbar }
