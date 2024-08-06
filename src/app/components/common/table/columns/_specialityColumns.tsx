// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { ImageCell } from './ImageCell'
import { UserCustomHeader } from './CustomHeader'
import { ActionCell } from './ActionCell'


const specialityColumns: ReadonlyArray<Column<any>> = [
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
    Header: (props) => (
    <UserCustomHeader tableProps={props} title="Action" className=" min-w-100px"/>),
    id: "action",
    Cell: ({ ...props }) => (
      <ActionCell user={props.data[props.row.index]} />
    ),
  },
]

export { specialityColumns }
