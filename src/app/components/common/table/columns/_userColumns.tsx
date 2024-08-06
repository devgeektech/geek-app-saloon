// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { ImageCell } from './ImageCell'
import { UserCustomHeader } from './CustomHeader'
import { TitleImageCell } from './TitleImageCell'
const usersColumns: ReadonlyArray<Column<User>> = [
  {

    Header: (props) => <UserCustomHeader tableProps={props} title='customer name' className='min-w-50px' />,
    id: 'customer name',
    Cell: ({ ...props }) => <TitleImageCell userObj={props.data[props.row.index]} />,
  },

  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='mobile number' className='min-w-50px' />
  //   ),
  //   id: 'mobile number',
  //   Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].mobileNumber} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='email' className='min-w-50px' />
    ),
    id: 'email',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].email} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='image' className='min-75px' />,
    id: 'image',
    Cell: ({ ...props }) => <ImageCell userObj={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => (  
  //     <UserCustomHeader tableProps={props} title='Active' className='min-w-75px' />
  //   ),
  //   id: 'isActive',
  //   Cell: ({ ...props }) => <ActiveCell user={props.data[props.row.index]} />,
  // },
]

export { usersColumns }
