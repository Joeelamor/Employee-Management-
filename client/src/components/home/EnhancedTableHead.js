import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const rows = [
  { id: "avatar", label: "" },
  { id: "name", label: "Name" },
  { id: "title", label: "Title" },
  { id: "sex", label: "Sex" },
  { id: "startDate", label: "Start Date" },
  { id: "officePhone", label: "Office Phone" },
  { id: "cellPhone", label: "Cell Phone" },
  { id: "sms", label: "SMS" },
  { id: "email", label: "Email" },
  { id: "manager", label: "Manager" },
  { id: "noOfDR", label: "# of DR" },
  { id: "edit", label: "" },
  { id: "delete", label: "" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                style={{ fontSize: "12px" }}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title={
                    row.id !== "avatar" &&
                    row.id !== "edit" &&
                    row.id !== "delete"
                      ? "Sort"
                      : ""
                  }
                  placement={"bottom-end"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default EnhancedTableHead;
