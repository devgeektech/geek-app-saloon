import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../redux/actions/user/userAction'
import deleteIcon from "../../../_metronic/images/deleteIcon.svg";
import { handleCloseUserDeleteModal, handleOpenUserDeleteModal } from '../../redux/actions/user/userSlice'
import DeleteModal from '../common/modal/DeleteModal'
import ImageWithFallback from '../../utils/FallbackImage'
import fallBackImage from '../../../_metronic/assets/images/fallBackImage.png'
import './SharedTable.css'

function SharedTable() {
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getUsers({ page: 1, limit: 50 }));

    }, [dispatch])
    const userState = useSelector((state: any) => state.userList)

    const deleteOpenModal = (id: string) => {
        dispatch(handleOpenUserDeleteModal())
    };

    const deleteCloseModal = () => {
        dispatch(handleCloseUserDeleteModal())
    }

    const deleteUsers = () => {
        dispatch(deleteUser(userState.selectedUserId))
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userState?.data?.map((item: any) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item?.name || "N/A"}</td>
                                        <td>{item?.email || "N/A"}</td>
                                        <td><ImageWithFallback
                                         src={item?.profilePicture}
                                         alt="Sample Image"
                                         fallBackSrc={fallBackImage}
                                         styleClass="image-thumbnail"/></td>
                                        <td>{item?.Phone || "N/A"}</td>
                                        <td>
                                                <img
                                                    src={deleteIcon}
                                                    className="cursor-pointer deleteBtn"
                                                    alt="deleteIcon"
                                                    onClick={() => deleteOpenModal(item._id)}
                                                />
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>

            {userState.openUserDeleteModal && <DeleteModal
                id={userState.selectedUserId}
                openModal={userState.openUserDeleteModal}
                closeModal={() => deleteCloseModal()}
                dispatchAction={() => deleteUsers()}
            />}

        </>
    )
}
export default SharedTable