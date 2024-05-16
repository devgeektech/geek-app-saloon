import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import coupon from '../../../_metronic/images/coupon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import { Dropdown, Tab, Tabs } from 'react-bootstrap'
import ActiveTable from '../../components/bannerTable'
import InActiveTable from '../../components/bannerTable/inActive'
import Pagination from '../../components/pagenation'
import { useNavigate } from 'react-router-dom'

const BannerWrapper = () => {
  const intl = useIntl()
  const navigate = useNavigate();

  const addBanner = () => {
    navigate('/banner/add');
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      {/* <DashboardPage /> */}

      {/* Dashboard Page Html Start */}
      <div className='appointmentContent'>
        <div className='title_text d-flex justify-content-between align-items-center'>
          <div className=''>
            <h2 className='page_title'>
              <img src={coupon} alt='coupon' />
              Banners
            </h2>
          </div>
          <button onClick={addBanner} className='yellowBtn'>
            Add
          </button>
        </div>
        <div className='tabWrapper'>
          <div className='searchbar_filter d-flex justify-content-end mb-5'>
            <div className='searchbar'>
              <input type='text' className='form-control' placeholder='Search...' />
              <button>
                <img src={searchIcon} alt='searchIcon' />
              </button>
            </div>
            {/* <div className='filterWrapper'>
              <Dropdown>
                <Dropdown.Toggle
                  className='filterDropdown'
                  variant='success'
                  id='dropdown-basic'
                >
                  Fillter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                  <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                  <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
          </div>
          <div className='tableWrapper mb-5'>
            <ActiveTable />
            <div className='select-all mt-4 d-flex align-items-center'>
              {/* <label className='d-flex align-items-center gap-2'>
                <input type='checkbox'></input>select-all
              </label> */}
            </div>

          </div>
        </div>
      </div>

      {/* Dashboard Page Html End */}
    </>
  )
}

export { BannerWrapper }
