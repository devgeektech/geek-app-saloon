import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import { Table } from 'react-bootstrap'
import ModalInner from '../../modals/deleteModal'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { closeDeleteModal, deleteCategoryRequest, resetCategoryForm, setCategoryForm, setDeleteModal, setSelectedCategoryId } from '../../redux/reducer/categorySlice'
import dummyImg from '../../../_metronic/images/dummy.webp'
import { getImageUrl } from '../../utils/common'

export default function TableCategory() {
  const dispatch = useDispatch()
  const { categoryList, selectedCategoryId, showDeleteModal } = useSelector((state: any) => state.category);

  const deleteItem = (event: any) => {
    console.log('Selected category ID:', selectedCategoryId);
    if (event && selectedCategoryId !== "") {
      dispatch(deleteCategoryRequest({ id: selectedCategoryId }));
      dispatch(resetCategoryForm());
    }
  }

  const handleEdit = (data: any) => {
    dispatch(setCategoryForm({ id: data._id, name: data.name, image: data.photo }));
  }

  return (
    <>
      <Table responsive className='table table-bordered'>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Photo</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList &&
            categoryList.length > 0 &&
            categoryList.map((listValue: any, index: number) => {
              return (
                <tr key={`cat${index}`}>
                  <td>{listValue?.name}</td>
                  <td>
                    <img
                      src={listValue.photo ? getImageUrl(listValue.photo) : dummyImg}
                      className='user-img'
                      alt='catimage'
                    />
                  </td>
                  <td className='active'>
                    Active
                  </td>
                  <td>
                    <div className='d-flex'>
                      <button className='editBtn' onClick={() => handleEdit(listValue)}>
                        <img src={pencilEditIcon} alt='pencilEditIcon' />
                      </button>
                      <button className='deleteBtn' onClick={() => {
                        dispatch(setDeleteModal())
                        dispatch(setSelectedCategoryId(listValue?._id))
                      }}>
                        <img src={deleteIcon} alt='deleteIcon' />
                      </button>
                      <button className='deleteBtn'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='13'
                          height='14'
                          viewBox='0 0 13 14'
                          fill='none'
                        >
                          <path
                            d='M4 11.5L8 7.5L4 3.5'
                            stroke='#8D8D8D'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
      <ModalInner
        deleteUserClbk={deleteItem}
        openModal={showDeleteModal}
        closeModal={() => dispatch(closeDeleteModal())}
      />
      {/*  <KTCard>
        <PartnersListHeader />
      <CommonTable data={data} columns={categoryColumns} /> */}
      {/* {sharedActions.categoryModal && <CategoryModal />}
        {totalRecord > 10 && (
          <Pagination totalRecord={totalRecord} handleClick={handleClick} />
        )} 
      </KTCard>*/}
    </>
  )
}
