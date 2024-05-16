import React from 'react'

export default function SettingTable() {
  return (
    <>
      <div className='tableWrapper my-5'>
        <div className='table-responsive'>
          <table className='table table-bordered coupons table'>
            <thead>
              <tr>
                <th>Sr no</th>
                <th>Notication</th>
                <th>Type</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>001</td>
                    <td>New Offer 30% discount</td>
                    <td>Promotional</td>
                    <td className='active'>Active</td>
                </tr>
                <tr>
                    <td>001</td>
                    <td>New Offer 30% discount</td>
                    <td>Promotional</td>
                    <td className='active'>Active</td>
                </tr>
                <tr>
                    <td>001</td>
                    <td>New Offer 30% discount</td>
                    <td>Promotional</td>
                    <td className='inactive'>Active</td>
                </tr>
                <tr>
                    <td>001</td>
                    <td>New Offer 30% discount</td>
                    <td>Promotional</td>
                    <td className='active'>Active</td>
                </tr>
                <tr>
                    <td>001</td>
                    <td>New Offer 30% discount</td>
                    <td>Promotional</td>
                    <td className='active'>Active</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
