
import { FC } from 'react'
import dummyImage from '../../../../../../icons/profileImg.png'
// import { capitalizeFirstLetter } from '../../../../../../../utils/const'


type Props = {
  userObj: any
}

const TitleImageCell: FC<Props> = ({ userObj }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className="symbol symbol-50px overflow-hidden me-3">
        <div className="symbol-label">
          <img
            src={userObj?.profilePicture ? userObj?.profilePicture : dummyImage}
            alt={`prifilepic`}
            className="w-50"
          />
        </div>
      </div>
      <div className='text-gray-800 mb-1 d-flex flex-column'>
        {/* <span>{userObj ? capitalizeFirstLetter(userObj.firstName) + " " + capitalizeFirstLetter(userObj.lastName) : "--"}</span>
        {userObj.mobileNumber && <span className='text-gray-400'>{`+${userObj?.mobileNumber}`}</span>} */}
      </div>
    </div>
  )
}

export { TitleImageCell }
