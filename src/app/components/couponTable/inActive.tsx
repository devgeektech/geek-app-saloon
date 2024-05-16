import React from 'react'
import {Dropdown, Tab, Table, Tabs} from 'react-bootstrap'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import './style.scss'

export default function InActiveTable() {
  return (
    <>
      <Table responsive className='table table-bordered coupons'>
        <thead>
          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <th>Sr no</th>
            <th>Offer ID</th>
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
          <tr>
            <td>
              <input type='checkbox' />
            </td>
            <td>001</td>
            <td>545151511451</td>
            <td>Upto $10/- Off</td>
            <td>Hair</td>
            <td>Haircut</td>
            <td>All</td>
            <td>Tue,Sept 4,2023</td>
            <td className='inactive'> inactive
              <label className='switch' >
                <input type='checkbox' checked />
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
        </tbody>
      </Table>
    </>
  )
}
