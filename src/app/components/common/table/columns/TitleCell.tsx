
import { FC } from 'react'


type Props = {
  userObj: any
}

const TitleCell: FC<Props> = ({ userObj }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 mb-1'>
          {userObj ? userObj:"--"}
        </span>
      </div>
    </div>
  )
}

export { TitleCell }
