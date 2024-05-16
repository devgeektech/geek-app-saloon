import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Button, Dropdown} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useEffect, useState} from 'react'
import {addBanner} from '../../modules/auth/core/_requests'

const AddBanner = () => {
  const intl = useIntl()
  const [formData, setFormData] = useState({
    name: 'Hair Care',
    type: 'TOP',
    photo: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Do something with formData, like sending it to a server

  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={12}>
              <Form.Label htmlFor='name'>Name</Form.Label>
              <Form.Control
                type='text'
                aria-describedby='name'
                name='name'
                value={formData.name || ''}
                onChange={handleChange}
              />
            </Col>
            <Col sm={12} className='mt-4'>
              <Form.Select aria-label='Default select example' onChange={handleChange} name='type'>
                <option>Open this select menu</option>
                <option value='TOP'>Top</option>
                <option value='MIDDLE'>Middle</option>
                <option value='BOTTOM'>Bottom</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className='mt-4'>
              <Form.Group controlId='formFile' className='mb-3'>
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type='file' name='photo' value={formData.photo || ''} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button variant='primary' type='submit'>
              Primary
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export {AddBanner}
