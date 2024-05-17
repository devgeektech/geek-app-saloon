import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import coupon from '../../../_metronic/images/coupon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import {Dropdown, Tab, Tabs} from 'react-bootstrap'
import Pagenation from '../../components/pagenation'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './editUser.scss'

const EditUser = () => {
  const intl = useIntl()


  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      {/* <DashboardPage /> */}

      {/* Dashboard Page Html Start */}
      <Container>
        <Row>
        <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Email</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
        <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
        <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
        <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
        <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className='searchbar_filter d-flex'>
              <div className='searchbar'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control type='text' id='name' aria-describedby='name' />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Dashboard Page Html End */}
    </>
  )
}

export {EditUser}
