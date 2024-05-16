import React from 'react'
import { Dropdown, Tab, Table, Tabs } from 'react-bootstrap'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import './style.scss'
import { useEffect, useState } from 'react'
import { getBanners } from '../../modules/auth/core/_requests'
import Pagination from '../pagenation'

export default function ActiveTable() {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    getBanners().then((res: any) => {
      setBanners(res.data?.data)
    })
  }, [])

  return (
    <>
      <Table responsive className='table table-bordered coupons'>
        <thead>
          <tr>
            {/* <th>
              <input type='checkbox' />
            </th> */}
            {/* <th>Sr no</th> */}
            <th>Title</th>
            <th>Image</th>

            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {banners &&
            banners.length > 0 &&
            banners.map((item: any, index) => (
              <tr key={`test${index}`}>
                {/* <td>
                  <input type='checkbox' />
                </td> */}
                {/* <td>{`${index + 1}`}</td> */}
                <td>{item.name}</td>
                <td>
                  <img className='profileImg' src={item?.photo} alt='' />
                </td>

                <td>{item.createdAt}</td>
                <td className='active'>
                  {' '}
                  Active
                  <label className='switch'>
                    <input type='checkbox' />
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
      {banners.length > 10 && <div className='mt-5'>
        <Pagination />
      </div>}
    </>
  )
}
