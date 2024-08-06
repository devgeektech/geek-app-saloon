/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
// import {
//   setCategoryModalStatus,
//   setFormDetails,
//   setModalStatus,
//   setShowSessionModal,
// } from "../../../../../../../redux/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
// import { conFirmMessage } from "../../../../../../../utils/shared";
// import {  deleteCategory} from "../../../../../../../redux/features/category/_categoryAction";
// import {  deleteSpeciality} from "../../../../../../../redux/features/speciality/_specialityAction";
import { Dropdown } from "react-bootstrap";
// import ThreeDotsIcon from "../../../../../../../_metronic/assets/logo/ThreeDotsIcon";
import { Link } from "react-router-dom";
// import { deleteSession } from "../../../../../../../redux/features/session/_sessionAction";
// import { SIDEBAR } from "../../../../../../../utils/const";

type Props = {user: any};

const ActionCell: FC<Props> = ({ user }) => {
  const dispatch: any = useDispatch();
  const sharedActions = useSelector((state: any) => state.sharedActions);

  const openEditModal = () => {
    // dispatch(setFormDetails(user));
    // switch (sharedActions.id) {
    //   case SIDEBAR.SPECIALITY:
    //     dispatch(setModalStatus(true));
    //     break;
    //   case SIDEBAR.CATEGORY:
    //     dispatch(setCategoryModalStatus(true));
    //     break;
    //   case SIDEBAR.SESSION:
    //     dispatch(setShowSessionModal(true));
    //     break;

    //   default:
    // }
  };

  // const handleDelete = (itemId) => {
  //   const values = {
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   };
  //   conFirmMessage(values).then((result) => {
  //     if (result.isConfirmed) {
  //       if (sharedActions.id === SIDEBAR.CATEGORY) {
  //         dispatch(deleteCategory({ id: itemId }));
  //       } else if (sharedActions.id === SIDEBAR.SPECIALITY) {
  //         dispatch(deleteSpeciality({ id: itemId }));
  //       } else if (sharedActions.id === SIDEBAR.SESSION) {
  //         dispatch(deleteSession({ id: itemId }));
  //       }
  //     }
  //   });
  // };

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="menu-item me-4">
          <Dropdown className="verifiedOptions">
            <Dropdown.Toggle variant="default" id="dropdown-basic">
              {/* <ThreeDotsIcon /> */}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link
                to={"#"}
                className="menu-link px-3 btn  btn-active-light-primary btn-sm"
                onClick={openEditModal}
              >
                Edit
              </Link>
              <Link
                to={"#"}
                className="menu-link px-3 btn  btn-active-light-primary btn-sm"
                data-kt-users-table-filter="delete_row"
                // onClick={async () => await handleDelete(user._id)}
              >
                Delete
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          {/* <a
            className="menu-link px-3 btn btn-secondary btn-active-light-primary btn-sm"
            onClick={openEditModal}
          >
            Edit
          </a> */}
          {/* </div> */}
          {/* <div className="menu-item">
          <a
            className="menu-link px-3 btn btn-danger btn-active-light-primary btn-sm"
            data-kt-users-table-filter="delete_row"
            onClick={async () => await handleDelete(user._id)}
          >
            Delete
          </a>
        </div> */}
        </div>
      </div>
    </>
  );
};

export { ActionCell };
