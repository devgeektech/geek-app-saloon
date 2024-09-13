
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const Primetable = (props) => {


    return <>
        <Table responsive className='table table-bordered'>
            <thead>
                <tr>
                    <th>
                        <input type='checkbox' />
                    </th>
                    <th>Sr no</th>
                    <th>Appointment ID</th>
                    <th>Salon</th>
                    <th>Customer Name</th>
                    <th>Service (Category)</th>
                    <th>Sub-Category</th>
                    <th>Date/Time</th>
                    <th>Status</th>
                    <th>Payment</th>
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
                    <td>Cleaned Salon</td>
                    <td>Joe Doe</td>
                    <td>Hair, Massage</td>
                    <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                    <td>Tue, Sept 4, 11:30 am</td>
                    <td>
                        <span className='pending'>Pending</span>
                    </td>
                    <td>
                        <span className='paidbadge'>Paid</span>
                    </td>
                    <td>
                        {/* <div className='d-flex'>
                          <button className='editBtn'>
                            <img src={pencilEditIcon} alt='pencilEditIcon' />
                          </button>
                          <button className='deleteBtn'>
                            <img src={deleteIcon} alt='deleteIcon' />
                          </button>
                        </div> */}
                    </td>
                </tr>





            </tbody>
        </Table>
    </>
}