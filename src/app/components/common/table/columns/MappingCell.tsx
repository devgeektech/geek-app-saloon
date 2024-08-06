
import { FC } from 'react'


type Props = { userObj: any }

const MappingCell: FC<Props> = ({ userObj }) => {
    return (
        <div className='d-flex align-items-center'>
            <div className='d-flex flex-column'>
                <span className='text-gray-800 mb-1'>
                    {userObj?.speciality?.length > 0 ?
                        userObj?.speciality?.map((speciality:any,index:number) => (
                            <span key={index}>
                                {speciality?.cat}
                                {index < userObj.speciality.length - 1 ? ", " : ""}
                            </span>
                        ))
                        : "NA"}
                </span>
            </div>
        </div>
    )
}


export { MappingCell }
