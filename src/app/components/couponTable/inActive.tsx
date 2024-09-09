import React from 'react'
import {Dropdown, Tab, Table, Tabs} from 'react-bootstrap'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import './style.scss'
import moment from 'moment'

export default function InActiveTable({coupons, deleteItem, editItem}) {
  return (
    <>
      <Table responsive className='table table-bordered coupons'>
        <thead>
          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <th>Sr no</th>
            <th>Offer Name</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Service</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          coupons?.map((coupon:any,index:number)=>
          <tr key={index}>
            <td>
              <input type='checkbox' />
            </td>
            <td>{index+1}</td>
            <td>{coupon?.offerName}</td>
            <td>{coupon?.category?.name}</td>
            <td>{coupon?.subcategory?.name}</td>
            <td>{coupon?.service?.name}</td>
            <td>{moment(coupon?.createdAt).format('Do MMM YYYY')}</td>
            <td className='inactive'> {coupon.status}
              <label className='switch' >
                <input type='checkbox' checked />
                <span className='slider round'></span>
              </label>
            </td>
            <td>
              <div className='d-flex'>
                <button className='editBtn' onClick={()=>editItem(coupon)}>
                  <img src={pencilEditIcon} alt='pencilEditIcon' />
                </button>
                <button className='deleteBtn' onClick={()=>deleteItem(coupon?._id)}>
                  <img src={deleteIcon} alt='deleteIcon' />
                </button>
              </div>
            </td>
          </tr>
          )}
          </tbody>
      </Table>
    </>
  )
}
