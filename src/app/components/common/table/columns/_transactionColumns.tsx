// @ts-nocheck
import { Column } from "react-table";
import { TitleCell } from "./TitleCell";
import { UserCustomHeader } from "./CustomHeader";
import { TitleImageCell } from "./TitleImageCell";
import moment from "moment";

const transactionsColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Psychologist name"
        className="min-w-50px"
      />
    ),
    id: "psychologist name",
    Cell: ({ ...props }) => (
      <TitleImageCell userObj={props.data[props.row.index].partnerId} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Amount"
        className="min-75px"
      />
    ),
    id: "amount",
    Cell: ({ ...props }) => (
      <TitleCell userObj={props.data[props.row.index].amount} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Date"
        className="min-w-50px"
      />
    ),
    id: "date",
    Cell: ({ ...props }) => (
      <TitleCell
        userObj={moment(props.data[props.row.index].updatedAt).format(
          "DD/MM/YYYY"
        )}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Status"
        className="min-75px"
      />
    ),
    id: "status",
    Cell: ({ ...props }) => (
      <TitleCell userObj={props.data[props.row.index].status} />
    ),
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Mode" className="min-75px" />
    ),
    id: "mode",
    Cell: ({ ...props }) => (
      <TitleCell userObj={props.data[props.row.index].mode} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Payment Id"
        className="min-75px"
      />
    ),
    id: "PaymentId",
    Cell: ({ ...props }) => (
      <TitleCell userObj={props.data[props.row.index].paymentId} />
    ),
  },
];

export { transactionsColumns };
