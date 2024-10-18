import { Outlet, Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SelectSaloonModal from '../../components/saloonModal'

const SaloonWrapper = () => {
  const {modalStatus} = useSelector((state:any)=>state.helper)

  useEffect(()=>{},[])

  return (
    <>
     {modalStatus && (
        <SelectSaloonModal
          show={modalStatus}
        />
      )}

    </>
  )
}

export { SaloonWrapper }
