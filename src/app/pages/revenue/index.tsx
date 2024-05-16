import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import RevenueIcon from '../../../_metronic/images/RevenueIcon.svg'
import MonthlyRevenue from '../../../_metronic/images/chart.jpg'
import chartBar from '../../../_metronic/images/chartBar.jpg'

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
import {Row, Tab, Col, Tabs} from 'react-bootstrap'
import './revenueStyle.scss'

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

const RevenueWrapper = () => {
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
              <img src={RevenueIcon} alt='RevenueIcon' />
              Revenue
            </h2>
            {/* <p>Monitor your financial performance through revenue tracking</p> */}
          </div>
        </div>
        <div className='tabWrapper'>
          {/* <p className='viewList'>viewing 2 of 6 of 6</p> */}
          <Tabs defaultActiveKey='Monthly' id='uncontrolled-tab-example'>
            <Tab eventKey='Monthly' title='Monthly'>
              <div className='main-revenue-iner'>
                <Row>
                  <Col md={6}>
                    <div className='main-revenue'>
                      <h2 className='page_title'>Monthly Revenue</h2>
                      <img src={MonthlyRevenue} />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className='main-revenue'>
                      <h2 className='page_title'>Total monthly Revenue</h2>
                      <img src={chartBar} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab eventKey='Daily' title='Daily'>
              <div className='main-revenue-iner'>
                <Row>
                  <Col md={6}>
                    <div className='main-revenue'>
                      <h2 className='page_title'>Daily Revenue</h2>
                      <img src={MonthlyRevenue} />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className='main-revenue'>
                      <h2 className='page_title'>Total Revenue for the week</h2>
                      <img src={chartBar} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Dashboard Page Html End */}

      {/* Delete modal */}

      {/* End Delete modal */}
    </>
  )
}

export {RevenueWrapper}
