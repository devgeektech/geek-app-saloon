import React, {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import './style.scss'

export default function ActiveTable(data) {
  const [vendors, setVendors] = useState([])
  useEffect(() => {
    setVendors(data.vendors)
  }, [data])

  return (
    <>
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
                      <img src={deleteIcon} alt='deleteIcon' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}
