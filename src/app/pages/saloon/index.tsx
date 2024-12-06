import { useDispatch, useSelector } from 'react-redux'
import SelectSaloonModal from '../../components/saloonModal'
import './saloonStyle.scss'
import { setModalStatus } from '../../redux/actions/helper/helperSlice'
import { modalStatus } from '../../services/_requests'


const SaloonWrapper = () => {
let dispatch:any= useDispatch()

  const { modalStatus } = useSelector((state: any) => state.helper)
  dispatch(setModalStatus(true))
  
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
