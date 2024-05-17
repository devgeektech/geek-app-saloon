import React, { useEffect, useState } from 'react'
import Massage from '../../../_metronic/images/massage.png'
import FullBeard from '../../../_metronic/images/full_beard.png'
import Hairbath from '../../../_metronic/images/hair-bath.png'
import Jhonson from '../../../_metronic/images/jhonDeo.svg'
import HairColor from '../../../_metronic/images/hair-color.png'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import { Dropdown, Tab, Table, Tabs } from 'react-bootstrap'
import ModalInner from '../../modals/deleteModal'
import { useDispatch, useSelector } from 'react-redux'

export default function TableSubCategory() {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = React.useState(false)
  const [subCategories, setSubCategories] = useState([])
  const { subCategoryList } = useSelector((state: any) => state.subcategory);




  useEffect(() => {
    setSubCategories(subCategoryList)
  }, [subCategoryList])

  const deleteOpenModal = () => {

    setModalShow(true)
  }

  function getImageUrl(imageUrl) {
    const baseUploadPath = process.env.REACT_APP_PUBLIC_URL;
    if (imageUrl.startsWith('/upload')) {
      return baseUploadPath + imageUrl;
    } else {
      return imageUrl;
    }
  }

  return (
    <div>
      <Table responsive className='table table-bordered'>
        <thead>
          <tr>
            <th>Subcategory</th>
            <th>Photo</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subCategories &&
            subCategories.length > 0 &&
            subCategories.map((subCat: any, index: number) => (
              <tr key={`subCat${index}`}>
                <td>{subCat?.name}</td>
                <td>
                  <img
                    src={subCat.image ? getImageUrl(subCat.image) : pencilEditIcon}
                    className='user-img'
                    alt='img'
                  />
                </td>
                <td>{subCat?.categoryId?.name}</td>
                <td>
                  <div className='d-flex'>
                    <button className='editBtn'>
                      <img src={pencilEditIcon} alt='pencilEditIcon' />
                    </button>
                    <button className='deleteBtn' onClick={() => deleteOpenModal()}>
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
            ))}
        </tbody>
      </Table>

      {/* <ModalInner
      openModal={modalShow}
      closeModal={deleteCloseModal}
      /> */}
    </div>
  )
}
