/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { FC } from "react";
import profileImg from "../../../../../../../_metronic/assets/logo/default-product.png";
import { useSelector } from "react-redux";
// import { SIDEBAR } from "../../../../../../../utils/const";

type Props = { userObj: any; };

const ImageCell: FC<Props> = ({ userObj }) => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  return (
    <div className="d-flex align-items-center">
      <div className="symbol symbol-50px overflow-hidden me-3">
        <span >
          {(userObj.image || userObj.profilePicture) ? (
            <div className="symbol-label">
              <img
                // src={(sharedActions.id === SIDEBAR.PARTNER || sharedActions.id === SIDEBAR.USER ) ? userObj?.profilePicture : userObj?.image}
                alt={userObj.firstName?.substring(0, 1).toUpperCase()}
                className="w-50"
              />
            </div>
          ) : (
            <div className={clsx("symbol-label fs-3")}>
              <img className="w-100" src={profileImg} alt="" />
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export { ImageCell };