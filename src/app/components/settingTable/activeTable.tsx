import React from 'react'
import {Dropdown, Tab, Table, Tabs} from 'react-bootstrap'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import ChaverIcon from '../../../_metronic/images/chevron-back.svg'

export default function SettingActiveTable() {
  return (
    <div>
      <div className='tableWrapper my-5'>
        <div className='table-responsive'>
          <Table responsive className='table table-bordered coupons'>
            <thead>
              <tr>
                <th>
                  <input type='checkbox' />
                </th>
                <th>Sr no</th>
                <th>Notication</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>New Offer 30% discount</td>
                <td>Promotional</td>
                <td>
                  <div className='d-flex'>
                    <button className='editBtn'>
                      <img src={pencilEditIcon} alt='pencilEditIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={deleteIcon} alt='deleteIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={ChaverIcon} alt='deleteIcon' />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>New Offer 30% discount</td>
                <td>Promotional</td>
                <td>
                  <div className='d-flex'>
                    <button className='editBtn'>
                      <img src={pencilEditIcon} alt='pencilEditIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={deleteIcon} alt='deleteIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={ChaverIcon} alt='deleteIcon' />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>New Offer 30% discount</td>
                <td>Promotional</td>
                <td>
                  <div className='d-flex'>
                    <button className='editBtn'>
                      <img src={pencilEditIcon} alt='pencilEditIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={deleteIcon} alt='deleteIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={ChaverIcon} alt='deleteIcon' />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>New Offer 30% discount</td>
                <td>Promotional</td>
                <td>
                  <div className='d-flex'>
                    <button className='editBtn'>
                      <img src={pencilEditIcon} alt='pencilEditIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={deleteIcon} alt='deleteIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={ChaverIcon} alt='deleteIcon' />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>New Offer 30% discount</td>
                <td>Promotional</td>
                <td>
                  <div className='d-flex'>
                    <button className='editBtn'>
                      <img src={pencilEditIcon} alt='pencilEditIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={deleteIcon} alt='deleteIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <img src={ChaverIcon} alt='deleteIcon' />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}
