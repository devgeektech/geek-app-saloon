/* eslint-disable jsx-a11y/anchor-is-valid */
import Dropdown from 'react-bootstrap/Dropdown'
import '../../components/aside/AsideToolbar.scss'
import LoginIcon from '../../../images/M1_S3_3.png'
import { useDispatch, useSelector } from 'react-redux'
import { setSaloonName } from '../../../../app/redux/reducer/saloonSlice'
import { useNavigate } from 'react-router-dom'
import { setModalStatus } from '../../../../app/redux/actions/helper/helperSlice'
// import { setModalStatus} from '../../../../app/redux/reducer/helperSlice'
import { useEffect } from 'react'
import { logout } from '../../../../app/redux/actions/auth/authSlice'

const HeaderToolbar = () => {
  const dispatch = useDispatch()
  const { saloonList, saloonName, saloonId } = useSelector((state: any) => state.saloon);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear()
    dispatch(logout())
  }
  const changeSaloon = () => {
    navigate('/saloon')
    dispatch(setModalStatus(true))
  }

  useEffect(() => {
    let saloonValue = saloonList.filter((item: any) => { return (item?._id == saloonId) });
    dispatch(setSaloonName(saloonValue[0]?.name))
  }, [saloonId])

  return (
    <div className='toolbar d-flex align-items-center justify-content-end w-100'>
      <div className='inr-dropdown-location me-4'>
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
                  <div className='ms-lg-2'>
                    <h5>Admin</h5>
                    <h6 className='mb-0'>{saloonName}</h6>
                  </div>
                </div>
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
