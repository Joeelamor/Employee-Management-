import React from "react";
import { connect } from "react-redux";
import {
  getEmployees,
  deleteEmployee,
  resetHasMoreItems
} from "../../redux/actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import EnhancedTableHead from "./EnhancedTableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { unstable_Box as Box } from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import EnhancedInfiniteScroll from "./EnhancedInfiniteScroll";

const styles = theme => ({
  tool: {
    paddingRight: theme.spacing.unit
  },
  root: {
    paddingRight: theme.spacing.unit
  },
  tableCell: {
    fontSize: "12px"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  title: {
    paddingRight: theme.spacing.unit,
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1"
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      order: "asc",
      orderBy: "name",
      initialLoad: true,
      offset: 0,
      limit: 20,
      pageStart: 0,
      employeeId: "",
      managerId: ""
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";
    if (property !== "edit" && property !== "delete" && property !== "avatar") {
      if (this.state.orderBy === property && this.state.order === "desc") {
        order = "asc";
      }
      this.setState(
        {
          order,
          orderBy,
          offset: 0,
          initialLoad: true,
          pageStart: this.state.pageStart === 0 ? -1 : 0
        },
        this.props.resetHasMoreItems
      );
    }
  };

  handleSearch = e => {
    this.setState(
      {
        search: e.target.value,
        offset: 0,
        initialLoad: true,
        pageStart: this.state.pageStart === 0 ? -1 : 0
      },
      this.props.resetHasMoreItems
    );
  };

  handleResetFilter = () => {
    this.setState(
      {
        search: "",
        order: "asc",
        orderBy: "name",
        offset: 0,
        initialLoad: true,
        employeeId: "",
        managerId: "",
        pageStart: this.state.pageStart === 0 ? -1 : 0
      },
      this.props.resetHasMoreItems
    );
  };

  loadMore = () => {
    new Promise((resolve, reject) => {
      resolve(
        this.props.getEmployeeList(
          this.state.offset,
          this.state.limit,
          this.state.orderBy,
          this.state.order,
          this.state.search,
          this.state.employeeId,
          this.state.managerId
        )
      );
    }).then(() => {
      let newOffset = this.state.offset + this.state.limit;
      this.setState({
        initialLoad: false,
        offset: newOffset
      });
    });
  };

  handleEditEmployee = id => {
    new Promise((resolve, reject) => {
      resolve(
        this.setState({
          offset: 0,
          initialLoad: true,
          pageStart: this.state.pageStart === 0 ? -1 : 0
        })
      );
    }).then(() => {
      this.props.history.push(`/edit/${id}`);
    });
  };

  handleDeleteEmployee = id => {
    this.setState(
      {
        offset: 0,
        initialLoad: true,
        pageStart: this.state.pageStart === 0 ? -1 : 0
      },
      () => {
        new Promise((resolve, reject) => {
          resolve(this.props.resetHasMoreItems);
        }).then(this.props.deleteEmployeeById(id));
      }
    );
  };

  handleAddEmployee = () => {
    new Promise((resolve, reject) => {
      resolve(
        this.setState({
          offset: 0,
          initialLoad: true,
          pageStart: this.state.pageStart === 0 ? -1 : 0
        })
      );
    }).then(() => {
      this.props.history.push("/create");
    });
  };

  handleFindDetail = employeeId => {
    this.setState(
      {
        employeeId: employeeId,
        offset: 0,
        initialLoad: true,
        pageStart: this.state.pageStart === 0 ? -1 : 0
      },
      this.props.resetHasMoreItems
    );
  };

  handleFindManager = managerId => {
    this.setState(
      {
        managerId: managerId,
        offset: 0,
        initialLoad: true,
        pageStart: this.state.pageStart === 0 ? -1 : 0
      },
      this.props.resetHasMoreItems
    );
  };

  render() {
    const { classes } = this.props;
    const { employees, err, hasMoreItems } = this.props;
    const { order, orderBy, initialLoad, pageStart } = this.state;

    if (err) throw err;
    return (
      <div>
        <Paper className={classes.tool}>
          <Toolbar className={classes.root}>
            <div className={classes.title}>
              <SearchIcon style={{ marginRight: "5px" }} />
              <TextField
                placeholder="search"
                id="search"
                value={this.state.search}
                onChange={this.handleSearch}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className={classes.spacer} />
            <Box display="flex" justifyContent="flex-end">
              <Box p={1}>
                <Tooltip title="Reset filter">
                  <Button variant="contained" onClick={this.handleResetFilter}>
                    Reset Filter
                  </Button>
                </Tooltip>
              </Box>
              <Box p={1}>
                <Tooltip title="Add new employee">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleAddEmployee}
                  >
                    New Employee
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Toolbar>
          <div className={classes.tableWrapper}>
            <EnhancedInfiniteScroll
              pageStart={pageStart}
              loadMore={this.loadMore}
              hasMore={hasMoreItems}
              initialLoad={initialLoad}
              threshold={100}
              loader={
                <div className="loader" key={0}>
                  Loading...
                </div>
              }
            >
              <Table aria-labelledby="tableTitle">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                />

                <TableBody>
                  {employees.map(employee => {
                    return (
                      <TableRow hover tabIndex={-1} key={employee._id}>
                        <TableCell className={classes.tableCell}>
                          <Avatar
                            src={employee.avatar}
                            style={{ borderRadius: 0 }}
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {employee.name}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {employee.title}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {employee.sex}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {employee.startDate}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <a href={"tel:" + employee.officePhone}>
                            {employee.officePhone}
                          </a>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <a href={"tel:" + employee.cellPhone}>
                            {employee.cellPhone}
                          </a>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {employee.sms}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <a href={"mailto:" + employee.email}>
                            {employee.email}
                          </a>
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          onClick={
                            employee.managerName !== ""
                              ? () => this.handleFindManager(employee.managerId)
                              : null
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <Link>{employee.managerName}</Link>
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          onClick={
                            employee.noOfDR !== "0"
                              ? () => this.handleFindDetail(employee._id)
                              : null
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <Link>{employee.noOfDR}</Link>
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          <Tooltip title="Edit">
                            <IconButton
                              aria-label="Edit"
                              color="primary"
                              onClick={() =>
                                this.handleEditEmployee(employee._id)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="Delete"
                              color="primary"
                              onClick={() =>
                                this.handleDeleteEmployee(employee._id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </EnhancedInfiniteScroll>
          </div>
        </Paper>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    employees: state.employeeList.employees,
    hasMoreItems: state.employeeList.hasMoreItems,
    err: state.employeeList.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployeeList: (
      offset,
      limit,
      orderBy,
      order,
      search,
      employeeId,
      managerId
    ) => {
      dispatch(
        getEmployees(
          offset,
          limit,
          orderBy,
          order,
          search,
          employeeId,
          managerId
        )
      );
    },
    deleteEmployeeById: id => {
      dispatch(deleteEmployee(id));
    },
    resetHasMoreItems: () => {
      dispatch(resetHasMoreItems());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
