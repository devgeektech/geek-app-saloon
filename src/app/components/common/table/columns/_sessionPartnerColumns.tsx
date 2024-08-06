// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { UserCustomHeader } from './CustomHeader'
import { TitleImageCell } from './TitleImageCell'
import { capitalizeFirstLetter } from '../../../../../../../utils/const'
import moment from 'moment'

const sessionPartnerColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Customer name' className='min-w-50px' />,
    id: 'customer name',
    Cell: ({ ...props }) => <TitleImageCell userObj={props.data[props.row.index]?.client} />,
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
    Header: (props) => <UserCustomHeader tableProps={props} title='Duration / Min' className='min-w-50px' />,
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
]

export { sessionPartnerColumns }
