import React from 'react'
import Stripe from '../../../_metronic/images/stripe.svg'
import Pagenation from '../common/pagination'

export default function PaymentTable() {
  return (
    <>
      <div className='tableWrapper my-5'>
        <div className='table-responsive'>
          <table className='table table-bordered coupons table'>
            <thead>
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
              <th>Method</th>
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
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='pendingbadge'>Pending</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='paidbadge'>Paid</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='incompletebadge'>Incomplete</span>
                </td>
                <td>
                  <span className='unpaidbadge'>Unpaid</span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='paidbadge'>Paid</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='paidbadge'>Paid</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='paidbadge'>Paid</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='paidbadge'>Paid</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='paidbadge'>Paid</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='paidbadge'>Paid</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>1 x Haircut(Spice)+1 x Shave + 2 Body Massage</td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className='completebadge'>Complete</span>
                </td>
                <td>
                  <span className='paidbadge'>Paid</span>
                </td>
                <td>
                  <img src={Stripe} alt='Stripe' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='select-all mt-4 d-flex align-items-center'>
        <label className='d-flex align-items-center gap-2' >
          <input type='checkbox' />
          select-all
        </label>
      </div>
      <Pagenation />
    </>
  )
}
