// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { ImageCell } from './ImageCell'
import { UserCustomHeader } from './CustomHeader'
import { ApproveCell } from './ApproveCell'

const blogColumns: ReadonlyArray<Column<any>> = [
  {

    Header: (props) => <UserCustomHeader tableProps={props} title='title' className='min-w-50px' />,
    id: 'title',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='description' className='min-w-50px' />,
    id: 'description',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='image' className='min-75px' />,
    id: 'image',
    Cell: ({ ...props }) => <ImageCell userObj={{...props.data[props.row.index],image:props.data[props.row.index].image[0]}} />,
  },
  {
    Header: (props) => (
    <UserCustomHeader tableProps={props} title="Action" className=" min-w-100px"/>),
    id: "action",
    Cell: ({ ...props }) => (
      <ApproveCell user={props.data[props.row.index]} />
    ),
  },
]

export { blogColumns }
