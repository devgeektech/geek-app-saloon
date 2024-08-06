import { useDispatch, useSelector } from 'react-redux';
// import { setCategoryModalStatus, setIsShowTransferModal, setModalStatus, setShowSessionModal } from '../../../../../../../redux/features/shared/sharedSlice';
// import {  SIDEBAR } from '../../../../../../../utils/const';
import { capitalizeFirstLetter } from '../../../../utils/common';
import { KTIcon } from '../../../../../_metronic/helpers';

const UsersListToolbar = () => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch = useDispatch();
  const openAddUserModal = () => {

    // switch (sharedActions.id) {
    //   case SIDEBAR.SPECIALITY:
    //     dispatch(setModalStatus(true))
    //     break;
    //   case SIDEBAR.CATEGORY:
    //     dispatch(setCategoryModalStatus(true))
    //     break;
    //   case SIDEBAR.SESSION:
    //     dispatch(setShowSessionModal(true))
    //     break;
    //   case SIDEBAR.TRANSACTION:
    //     dispatch(setIsShowTransferModal(true))
    //     break;
    //   default:
    // }
  }

  return (
    <>
      {/* {
        (sharedActions.id === SIDEBAR.SPECIALITY
          || sharedActions.id === SIDEBAR.CATEGORY
          || sharedActions.id === SIDEBAR.SESSION
          || sharedActions.id === SIDEBAR.TRANSACTION
        ) && <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
          <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
            <KTIcon iconName='plus' className='fs-2' />
            Add {capitalizeFirstLetter(sharedActions.id)}
          </button>
        </div>} */}
    </>
  )
}

export { UsersListToolbar }
