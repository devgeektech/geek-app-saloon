import Modal from 'react-bootstrap/Modal'
import './style.scss'
import DeleteIcon from '../Icons/TrashIcon'
import TrashIcon from '../Icons/TrashIcon'



export default function DeleteModal(props) {
  const { closeModal, deleteUserClbk,openModal } = props
  return (
    <>

      <Modal show={openModal} onHide={closeModal} aria-labelledby='contained-modal-title-vcenter' centered>
        <div className='delete-modal'>
          <Modal.Header>
            <button>
              <svg
                onClick={closeModal}
                xmlns='http://www.w3.org/2000/svg'
                width='19'
                height='19'
                viewBox='0 0 19 19'
                fill='none'
              >
                <path
                  d='M7.9193 9.49993L0.327318 17.0919C-0.109199 17.5285 -0.109013 18.2361 0.327318 18.6726C0.763836 19.1091 1.47148 19.1091 1.90798 18.6726L9.49997 11.0806L17.092 18.6726C17.5285 19.1091 18.2361 19.1091 18.6726 18.6726C19.1091 18.2361 19.1091 17.5284 18.6726 17.0919L11.0806 9.49993L18.6726 1.90792C19.1089 1.4714 19.1089 0.763754 18.6726 0.32725C18.2361 -0.109081 17.5285 -0.109081 17.092 0.32725L9.49997 7.91926L1.90798 0.32725C1.47147 -0.109081 0.763821 -0.109081 0.327318 0.32725C-0.109013 0.763769 -0.109013 1.47142 0.327318 1.90792L7.9193 9.49993Z'
                  fill='#778CA2'
                />
              </svg>
            </button>
          </Modal.Header>
          <Modal.Body>
            <TrashIcon />
            <h4>Are you sure you want to delete ?</h4>
            <p>If you delete you can't recover it.</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                closeModal
                deleteUserClbk(true)
              }}
              className='whitebtn'
            >
              Delete
            </button>
            <button
              onClick={closeModal}
              className='yellowBtn'
            >
              Cancel
            </button>
          </Modal.Footer>
        </div>
      </Modal>
      {/* <MyVerticallyCenteredModal show={openModal} onHide={closeModal} clbk={deleteUserClbk} /> */}
    </>
  )
}
