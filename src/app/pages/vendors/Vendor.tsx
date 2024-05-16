import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import coupon from '../../../_metronic/images/coupon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import { deleteVender, getVendors } from '../../modules/auth/core/_requests'
import Pagination from '../../components/pagenation'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import './style.scss'
import ModalInner from '../../modals/deleteModal'
import { toast } from 'react-toastify'




const ShopWrapper = () => {
  const intl = useIntl()
  const [vendors, setVendors] = useState([])
  const [lat, setLat] = useState(30.741482)
  const [lng, setLang] = useState(76.768066)
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [totalRecord, setTotalRecord] = useState(0)
  const [modalShow, setModalShow] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");

  useEffect(() => {
    vendorsList()
  }, [skip])

  const deleteOpenModal = (id: string) => {
    setModalShow(true);
    setDeleteUserId(id);
  };

  const deleteCloseModal = () => { 
    setModalShow(false);
  };

  const paginitionClbk = (val?: any) => {
    let skip1 = (val - 1) * limit
    setSkip(skip1)
  }

  const vendorsList = () => {
    getVendors(lat, lng, skip, limit).then((res: any) => {
      if (res.status === 200) {
        setVendors(res.data?.data)
        setTotalRecord(res.data?.totalRecord)
      } else {

      }
    })
  }


  const deleteUser: any = async (event: any) => {
    if (event === true) {
      await deleteVender(deleteUserId).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success("User Deleted Successfully");
          setModalShow(false);
          vendorsList();
        }
      });
      setModalShow(false);
      vendorsList();
    }
  };


  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <div className='appointmentContent'>
        <div className='title_text d-flex justify-content-between align-items-center'>
          <div className=''>
            <h2 className='page_title'>
              <img src={coupon} alt='coupon' />
              Vendors
            </h2>
          </div>
          <button className='yellowBtn'>Add</button>
        </div>
        <div className='tabWrapper'>
          <div className='searchbar_filter d-flex justify-content-end mb-5'>
            <div className='searchbar'>
              <input type='text' className='form-control' placeholder='Search...' />
              <button>
                <img src={searchIcon} alt='searchIcon' />
              </button>
            </div>
            {/* <div className='filterWrapper'>
              <Dropdown>
                <Dropdown.Toggle
                  className='filterDropdown'
                  variant='success'
                  id='dropdown-basic'
                >
                  Fillter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                  <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                  <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
          </div>
          <div className='tableWrapper mb-5'>
            <Table responsive className='table table-bordered coupons'>
              <thead>
                <tr>
                  {/* <th>
              <input type='checkbox' />
            </th> */}
                  {/* <th>Sr no</th> */}
                  <th>Vendor's Name</th>
                  <th>Image</th>
                  <th>Phone</th>
                  <th>Street Address / City</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors &&
                  vendors.length > 0 &&
                  vendors.map((item: any, index) => (
                    <tr key={index}>
                      {/* <td>
                  <input type='checkbox' />
                </td> */}
                      {/* <td>{`${index + 1}`}</td> */}
                      <td>{item?.name}</td>
                      <td>
                        <img className='profileImg' src={item?.photo} alt='' />
                      </td>

                      <td>{item?.phone}</td>
                      <td>
                        {item?.address?.streetAddress} /{item?.address?.city}{' '}
                      </td>
                      <td>{item?.createdAt}</td>
                      <td className='active'>
                        {' '}
                        Active
                        <label className='switch'>
                          <input type='checkbox' defaultChecked />
                          <span className='slider round'></span>
                        </label>
                      </td>
                      <td>
                        <div className='d-flex'>
                          <button className='editBtn'>
                            <img src={pencilEditIcon} alt='pencilEditIcon' />
                          </button>
                          <button className='deleteBtn'>
                            <img src={deleteIcon} alt='deleteIcon'
                              onClick={() => deleteOpenModal(item._id)}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className='select-all mt-4 d-flex align-items-center'>
              <label className='d-flex align-items-center gap-2'>
                {/* <input type='checkbox'></input>select-all */}
              </label>
            </div>
            {totalRecord > 10 && <Pagination
              data={vendors}
              limit={limit}
              totalRecord={totalRecord}
              paginitionClbk={(e: any) => {
                paginitionClbk(e)
              }}
            />}
          </div>
        </div>
      </div>
      <ModalInner
        deleteUserClbk={(e: any) => {
          deleteUser(e);
        }}
        openModal={modalShow}
        closeModal={deleteCloseModal}
      />
      {/* Dashboard Page Html End */}
    </>
  )
}

export { ShopWrapper }
