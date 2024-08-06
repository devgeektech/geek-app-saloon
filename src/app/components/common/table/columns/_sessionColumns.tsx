// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { UserCustomHeader } from './CustomHeader'
import { ActionCell } from './ActionCell'
import { TitleImageCell } from './TitleImageCell'
import { capitalizeFirstLetter } from '../../../../../../../utils/const'
import moment from 'moment'

const sessionColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Psychologist name' className='min-w-50px' />,
    id: 'psychologist name',
    Cell: ({ ...props }) => <TitleImageCell userObj={props.data[props.row.index]?.partner} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Customer name' className='min-w-50px' />,
    id: 'customer name',
    Cell: ({ ...props }) => <TitleImageCell userObj={props.data[props.row.index]?.user} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Variant' className='min-w-50px' />,
    id: 'variant',
    Cell: ({ ...props }) => <TitleCell userObj={capitalizeFirstLetter(props.data[props.row.index]?.type)} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Date' className='min-w-50px' />,
    id: 'date',
    Cell: ({ ...props }) => <TitleCell userObj={ moment(props.data[props.row.index]?.createdAt).format("D/MM/YYYY")} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Duration' className='min-w-50px' />,
    id: 'duration',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index]?.duration} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='wage / min' className='min-w-50px' />,
    id: 'wage',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index]?.wage} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='cancellation reason' className='min-w-50px' />,
    id: 'cancellationReason',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index]?.cancellationReason} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='appointmentStatus' className='min-w-50px' />,
    id: 'appointmentStatus',
    Cell: ({ ...props }) => <TitleCell userObj={(props.data[props.row.index]?.appointmentStatus == 'cancelled') ? 'Rejected' : (props.data[props.row.index]?.sessionStatus === "confirmed") ? 'Session Closed' : (props.data[props.row.index]?.isExpireAppointment == true) ? 'Expired' : props.data[props.row.index]?.appointmentStatus} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='total amount' className='min-w-50px' />,
    id: 'amount',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index]?.amount} />,
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

export { sessionColumns }
