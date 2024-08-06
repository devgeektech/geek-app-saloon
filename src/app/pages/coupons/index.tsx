import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import appointmentBlackIcon from '../../../_metronic/images/appointmentBlackIcon.svg'
import greenLineIcon from '../../../_metronic/images/greenLineIcon.svg'
import redLineIcon from '../../../_metronic/images/redLineIcon.svg'
import chart from '../../../_metronic/images/chart.jpg'
import coupon from '../../../_metronic/images/coupon.svg'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import {
  ListsWidget1,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  MixedWidget10,
  MixedWidget11,
  MixedWidget2,
  StatisticsWidget5,
  TablesWidget10,
  TablesWidget5,
} from '../../../_metronic/partials/widgets'
import {Dropdown, Tab, Table, Tabs} from 'react-bootstrap'
import ActiveTable from '../../components/couponTable'
import InActiveTable from '../../components/couponTable/inActive'
import Pagenation from '../../components/common/pagination'

const AppointmentPage = () => (
  <>
    {/* begin::Row */}

    {/* end::Row */}

    {/* begin::Row */}

    {/* end::Row */}

    {/* begin::Row */}

    {/* end::Row */}

    {/* begin::Row */}

    {/* end::Row */}

    {/* begin::Row */}

    {/* end::Row */}
  </>
)

const CouponsWrapper = () => {
  const intl = useIntl()

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      {/* <DashboardPage /> */}

      {/* Dashboard Page Html Start */}
      <div className='appointmentContent'>
        <div className='title_text d-flex justify-content-between align-items-center'>
          <div className=''>
            <h2 className='page_title'>
              <img src={coupon} alt='coupon' />
              Coupons
            </h2>
            <p>Coupon management to attract and reward customers</p>
          </div>
          <button className='yellowBtn'>Continue</button>
        </div>
        <div className='tabWrapper'>
          <p className='viewList'>viewing 2 of 6 of 6</p>
          <Tabs defaultActiveKey='Active' id='uncontrolled-tab-example'>
            <Tab eventKey='Active' title='Active'>
              <div className='searchbar_filter d-flex justify-content-end mb-5'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
                <div className='filterWrapper'>
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
                </div>
              </div>
              <div className='tableWrapper mb-5'>
              <ActiveTable />
              <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div>
              <Pagenation />
              </div>
            </Tab>
            <Tab eventKey='Inactive' title='Inactive'>
              <div className='searchbar_filter d-flex justify-content-end mb-5'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
                <div className='filterWrapper'>
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
                </div>
              </div>
              <div className='tableWrapper mb-5'>
               <InActiveTable/>
               <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div>
               <Pagenation />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Dashboard Page Html End */}
    </>
  )
}

export {CouponsWrapper}
