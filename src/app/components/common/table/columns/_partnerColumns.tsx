// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { UserCustomHeader } from './CustomHeader'
import { ActionVerifyCell } from './ActionVerify'
import { TitleImageCell } from './TitleImageCell'
import moment from 'moment'

const partnersColumns: ReadonlyArray<Column<any>> = [
  {

    Header: (props) => <UserCustomHeader tableProps={props} title='psychologist name' className='min-w-50px' />,
    id: 'psychologist name',
    Cell: ({ ...props }) => <TitleImageCell userObj={props.data[props.row.index]} />,
  },  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='JOINED DATE' className='min-w-50px' />
    ),
    id: 'JOINED DATE',
    Cell: ({ ...props }) => <TitleCell userObj={moment(props.data[props.row.index].createdAt).format("D/MM/YYYY")} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='VARIANT' className='min-w-50px' />
    ),
    id: 'VARIANT',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].abc} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='TOTAL DURATIONS' className='min-75px' />,
    id: 'TOTAL DURATIONS',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].abc} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='WAGE/MIN' className='min-75px' />,
    id: 'WAGE/MIN',
    Cell: ({ ...props }) => <TitleCell userObj={`₹ ${props.data[props.row.index].wage}`} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='TOTAL EARNING' className='min-75px' />,
    id: 'TOTAL EARNING',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].abc} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='ATTENDED PAT.' className='min-75px' />,
    id: 'ATTENDED PAT.',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].total_order} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-75px' />
    ),
    id: 'Action',
    Cell: ({ ...props }) => <ActionVerifyCell user={props.data[props.row.index]} />,
  },
]

export { partnersColumns }
