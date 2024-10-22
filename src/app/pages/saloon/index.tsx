import { useSelector } from 'react-redux'
import SelectSaloonModal from '../../components/saloonModal'
import './saloonStyle.scss'


const SaloonWrapper = () => {
  const { modalStatus } = useSelector((state: any) => state.helper)

  return (
    <>
      <div className="spinner-container">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      {modalStatus && (
        <SelectSaloonModal
          show={modalStatus}
        />
      )}

    </>
  )
}

export { SaloonWrapper }
