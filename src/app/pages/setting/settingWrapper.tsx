import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import SettingIcon from '../../../_metronic/images/settingIcon.svg'
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
import '../revenue/revenueStyle.scss'
import SettingTable from '../../components/settingTable/notificationTable'
import ActiveTable from '../../components/couponTable'
import SettingActiveTable from '../../components/settingTable/activeTable'
import Stripe from '../../../_metronic/images/stripe.svg'
import Applepay from '../../../_metronic/images/apple-pay.svg'
import Cash from '../../../_metronic/images/cash.svg'
import PaymentTable from '../../components/paymentTable'

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

const SettingWrapper = () => {
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
              <img src={SettingIcon} alt='SettingIcon' />
              Settings
            </h2>
            <p>Configure various dashboard settings for optimal functionality</p>
          </div>
        </div>
        <div className='tabWrapper'>
          {/* <p className='viewList'>viewing 2 of 6 of 6</p> */}
          <Tabs defaultActiveKey='Notifications' id='uncontrolled-tab-example'>
            <Tab eventKey='Notifications' title='Notifications'>
              <div className='main-revenue-iner'>
                <Row>
                  <Col md={7}>
                    <div className='main-revenue-left'>
                      <h2 className='page_title'>Add Email Address</h2>
                      <form>
                        <div className='inr-form'>
                          <Row>
                            <Col md={6}>
                              <label>Enter Email</label>
                              <input type='email' name='email' placeholder='Enter your email' />
                              <span>
                                joedoe@xyz.com
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='12'
                                  height='12'
                                  viewBox='0 0 12 12'
                                  fill='none'
                                >
                                  <path
                                    d='M7.94139 7.65841C7.95997 7.67699 7.97471 7.69905 7.98477 7.72332C7.99482 7.7476 8 7.77362 8 7.7999C8 7.82618 7.99482 7.8522 7.98477 7.87647C7.97471 7.90075 7.95997 7.92281 7.94139 7.94139C7.92281 7.95997 7.90075 7.97471 7.87647 7.98477C7.8522 7.99482 7.82618 8 7.7999 8C7.77362 8 7.7476 7.99482 7.72332 7.98477C7.69905 7.97471 7.67699 7.95997 7.65841 7.94139L6 6.28273L4.34159 7.94139C4.30407 7.97892 4.25317 8 4.2001 8C4.14703 8 4.09613 7.97892 4.05861 7.94139C4.02108 7.90387 4 7.85297 4 7.7999C4 7.74683 4.02108 7.69593 4.05861 7.65841L5.71727 6L4.05861 4.34159C4.02108 4.30407 4 4.25317 4 4.2001C4 4.14703 4.02108 4.09613 4.05861 4.05861C4.09613 4.02108 4.14703 4 4.2001 4C4.25317 4 4.30407 4.02108 4.34159 4.05861L6 5.71727L7.65841 4.05861C7.69593 4.02108 7.74683 4 7.7999 4C7.85297 4 7.90387 4.02108 7.94139 4.05861C7.97892 4.09613 8 4.14703 8 4.2001C8 4.25317 7.97892 4.30407 7.94139 4.34159L6.28273 6L7.94139 7.65841Z'
                                    fill='#131C1B'
                                  />
                                  <circle
                                    cx='6'
                                    cy='6'
                                    r='5.75'
                                    stroke='#131C1B'
                                    strokeWidth='0.5'
                                  />
                                </svg>
                              </span>
                            </Col>
                            <Col md={6}>
                              <label>Select Date/Time</label>
                              <select>
                                <option>Notification</option>
                                <option>Notification</option>
                              </select>
                              <div className='main-inr-all-day'>
                                <label className='d-flex align-items-center'>
                                  <input type='checkbox' />
                                  Alert All Day
                                </label>
                              </div>
                            </Col>
                            <Col md={12}>
                              <label>Select Notification</label>
                              <select>
                                <option>Notification</option>
                                <option>Notification</option>
                              </select>
                            </Col>
                          </Row>
                        </div>
                      </form>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className='flex-for-btns'>
                      <div className='main-revenue-right'>
                        <h3>Send notifications for</h3>
                        <div className='inr-switch-toggle-btn d-flex align-items-center justify-content-between'>
                          <p>Upcoming Appointments</p>
                          <label className='switch'>
                            <input type='checkbox' checked />
                            <span className='slider round'></span>
                          </label>
                        </div>
                        <div className='inr-switch-toggle-btn d-flex align-items-center justify-content-between'>
                          <p>Promotion & Offers</p>
                          <label className='switch'>
                            <input type='checkbox' />
                            <span className='slider round'></span>
                          </label>
                        </div>
                      </div>
                      <div className='btm-btns'>
                        <button className='whitebtn'>Cancel</button>
                        <button className='blackBtn'>Save</button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className='bootom-setting-table'>
                <Row>
                  <Col md={7}>
                    <div className='setting-left-tbl'>
                      <div className='d-flex align-items-center justify-content-between gap-5'>
                        <h2>All Notifications</h2>
                        <a href='#'>View All</a>
                      </div>
                      <SettingTable />
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className='setting-right-tbl'>
                      <div className='d-flex align-items-center justify-content-between gap-5'>
                        <h2>Active Notifications </h2>
                        <a href='#'>View All</a>
                      </div>
                      <SettingActiveTable />
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab eventKey='Payments' title='Payments'>
              <div className='main-payment-iner'>
                <Row>
                  <Col md={6}>
                    <div className='main-pay-method'>
                      <h2 className='page_title'>Payment Methods</h2>
                      <div className='payments-cards d-flex align-items-center justify-content-between'>
                        <p>
                          <img src={Stripe} />
                          Stripe
                        </p>
                        <span className='active'>Added</span>
                      </div>
                      <div className='payments-cards d-flex align-items-center justify-content-between'>
                        <p>
                          <img src={Applepay} />
                          Apple Pay
                        </p>
                        <a href='#'>
                          <span>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                            >
                              <path
                                d='M10 4.1665V15.8332'
                                stroke='#1C1C28'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M4.1665 10H15.8332'
                                stroke='#1C1C28'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                            Add Details
                          </span>
                        </a>
                      </div>
                      <div className='payments-cards d-flex align-items-center justify-content-between'>
                        <p>
                          <img src={Cash} />
                          Cash
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className='main-pay-method-right'>
                      <a href='#'>
                        <p>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                          >
                            <path
                              d='M10 4.1665V15.8332'
                              stroke='#1C1C28'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M4.1665 10H15.8332'
                              stroke='#1C1C28'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>{' '}
                          Add payment method
                        </p>
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className='appionmtent-lettr-tbl'>
                <Row>
                  <Col md={12}>
                    <div className='inr-payment-tbl'>
                      <PaymentTable />
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

export {SettingWrapper}
