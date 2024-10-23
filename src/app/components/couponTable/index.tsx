import React from 'react'
import {Dropdown, Tab, Table, Tabs} from 'react-bootstrap'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import './style.scss'
import moment from 'moment'
import { capitalizeFirstLetter } from '../../utils/common'
import { useSelector } from 'react-redux'

export default function ActiveTable({coupons, deleteItem, editItem,handleToggleChange}) {
  const { serviceMultipSelectArr } = useSelector((state: any) => state.service);

  const getServiceName = (id:any)=>{
    let res = serviceMultipSelectArr?.filter((data)=>{return data?.value == id});
    return res[0]?.label;
  }

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
            <th>Service</th>
            <th>Start Date</th>
            <th>Close Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
           coupons?.length? coupons?.map((coupon:any,index:number)=>
            <tr key={index}>
          <td>
            <input type='checkbox' />
          </td>
          <td>{index+1}</td>
          <td>{capitalizeFirstLetter(coupon?.offerName)}</td>
          <td>{coupon?.service ? getServiceName(coupon?.service) : ''}</td>
          <td>{moment(coupon?.offerStart).format('Do MMM YYYY')}</td>
          <td>{moment(coupon?.offerClose).format('Do MMM YYYY')}</td>
          <td className='active'> {coupon.status}
            <label className='switch' >
            <input type='checkbox' checked onChange={() => handleToggleChange(coupon._id,'InActive')}/>
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
          ):
            <tr className='w-100 mx-auto'>
              <td colSpan={9} className='text-center p-5'>
                No Coupon Found
              </td>
            </tr>
         }

          
        </tbody>
      </Table>
    </>
  )
}
