import DataTable from 'react-data-table-component'
import userTable from '../../utils/dataTable'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/actions/user/userAction'
function SharedTable() {
    const dispatch: any = useDispatch();
    useEffect(() => {
        dispatch(getUsers({ page: 1, limit: 50 }));

    }, [dispatch])

    let data = useSelector((state: any) => state.userList)


    return (
        <>
            {/* <DataTable
                columns={userTable}
                data={userTable}
                fixedHeader
                pagination

            /> */}

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Phone</th>

                        {/* <th scope="col">No. of Appointments</th> */}
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                   
                        {
                            data?.data?.map((item: any) => {
                                return (
                                    <>
                                     <tr>
                                        <td>{item?.name ||"N/A"}</td>
                                        <td>{item?.email ||"N/A"}</td>
                                        <td><img src={item?.profilePicture} alt="image"/></td>
                                        <td>{item?.Phone || "N/A"}</td>
                                        <td>Edit/ Delete</td>
                                        </tr>
                                    </>

                                )
                            })
                        }
              

                </tbody>
            </table>

        </>
    )
}
export default SharedTable