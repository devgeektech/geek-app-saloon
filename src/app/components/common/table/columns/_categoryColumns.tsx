// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { ImageCell } from './ImageCell'
import { ActiveCell } from './ActiveCell'
import { UserCustomHeader } from './CustomHeader'
import { User } from '../../core/_models'
import { MappingCell } from './MappingCell'
import { ActionCell } from './ActionCell'




const categoryColumns: ReadonlyArray<Column<User>> = [
  {

    Header: (props) => <UserCustomHeader tableProps={props} title='name' className='min-w-50px' />,
    id: 'name',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='description' className='min-w-50px' />,
    id: 'description',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='image' className='min-75px' />,
    id: 'image',
    Cell: ({ ...props }) => <ImageCell userObj={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
    <UserCustomHeader tableProps={props} title="Action" className=" min-w-100px"/>),
    id: "action",
    Cell: ({ ...props }) => (
      <ActionCell user={props.data[props.row.index]} />
    ),
  },
]

export { categoryColumns }
