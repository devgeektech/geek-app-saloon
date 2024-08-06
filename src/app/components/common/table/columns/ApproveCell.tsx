/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
// import ThreeDotsIcon from "../../../../../../../_metronic/assets/logo/ThreeDotsIcon";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { conFirmMessage } from "../../../../../../../utils/shared";
// import { approveBlog } from "../../../../../../../redux/features/blog/_blogAction";


const ApproveCell: FC<any> = ({ user }) => {
  const dispatch :any= useDispatch()
  const handleVerify = (itemId) => {
    const values = {
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Approve`,
    }
    // conFirmMessage(values).then((result) => {
    //   if (result.isConfirmed) {
    //     dispatch(approveBlog({ _id: user._id}))
    //   }
    // });
  };



  return (
    <>
      <div className="d-flex align-items-center">
        <div className="menu-item me-4">
          <Dropdown className="verifiedOptions">
            <Dropdown.Toggle variant="default" id="dropdown-basic">
              {/* <ThreeDotsIcon /> */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link onClick={()=>{handleVerify(user._id)}} to={`#`}
                className=" menu-link px-3 btn btn-primary btn-active-light-primary btn-sm"
                data-kt-users-table-filter="delete_row">
                Approve
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          {/* <a
            className="dropdown-item menu-link px-3 btn btn-primary btn-active-light-primary btn-sm"
            data-kt-users-table-filter="delete_row"
            onClick={async () => await handleDelete(user?._id, !user.isVerified)}
          >
            {user?.isVerified ? "Verified" : 'Verify'}
          </a> */}
        </div>
        <div className="menu-item">
          {/* <a
            type="button"
            className=" menu-link px-3 btn btn-primary btn-active-light-primary btn-sm"
            data-kt-users-table-filter="delete_row"
            onClick={openVerifyModal}
          >
            Update
          </a> */}
        </div>
      </div>

    </>
  );
};

export { ApproveCell };