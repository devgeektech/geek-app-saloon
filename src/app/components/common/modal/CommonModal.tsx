import { Button, Modal } from 'react-bootstrap'

const CommonModal = (props) => {
  return <Modal
  {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
          Add Audio
      </Modal.Title>
  </Modal.Header>
  <Modal.Body>

  </Modal.Body>
  <Modal.Footer>
      <Button variant="default" >Close</Button>
      <Button variant='primary'>
          {/* {
              isLoading ? <><Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className='me-2'
              />
                  Submitting...</> : 'Submit'
          } */}
      </Button>
  </Modal.Footer>
</Modal>
}

export default CommonModal