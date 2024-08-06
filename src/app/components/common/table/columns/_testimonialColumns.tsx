// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { UserCustomHeader } from './CustomHeader'
import { VerifyCell } from './verifyCell';
import moment from "moment";

const testimonialColumns: ReadonlyArray<Column<any>> = [
  {

    Header: (props) => <UserCustomHeader tableProps={props} title='first name' className='min-w-50px' />,
    id: 'firstName',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].userInfo_firstName} />,
  },
  {

    Header: (props) => <UserCustomHeader tableProps={props} title='last name' className='min-w-50px' />,
    id: 'lastName',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].userInfo_lasttName
    } />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Rating' className='min-w-50px' />,
    id: 'rating',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].rating} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Comment' className='min-75px' />,
    id: 'comment',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].comment} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Updated At' className='min-75px' />,
    id: 'updatedat',
    Cell: ({ ...props }) => <TitleCell userObj={moment(props.data[props.row.index].updatedAt).format("D/MM/YYYY")} />,
  },
  {
    Header: (props) => (
    <UserCustomHeader tableProps={props} title="Action" className=" min-w-100px"/>),
    id: "action",
    Cell: ({ ...props }) => (
      <VerifyCell user={props.data[props.row.index]} />
    ),
  },
]

export { testimonialColumns }
