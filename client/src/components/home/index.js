import React from "react";
import { connect } from "react-redux";
import { getEmployees, deleteEmployee } from "../../redux/actions";
import Loading from "../loading";
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
import Button from "@material-ui/core/Button";
import { unstable_Box as Box } from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";

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
      matchedText: "",
      order: "asc",
      orderBy: "name",
      managerToFind: "",
      detailIdToFind: "",
      findManager: false,
      findDetail: false
    };
  }

  componentDidMount() {
    if (this.props.first) {
      this.props.getEmployeeList();
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";
    if (property !== "edit" && property !== "delete") {
      if (this.state.orderBy === property && this.state.order === "desc") {
        order = "asc";
      }
      this.setState({ order, orderBy });
    }
  };

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  getSorting = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  };

  handleMatchedText = e => {
    this.setState({ matchedText: e.target.value });
  };

  handleFindManager = managerId => {
    this.setState({ managerToFind: managerId });
    this.setState({ findManager: true });
    this.setState({ findDetail: false });
  };

  handleFindDetail = detailId => {
    this.setState({ detailIdToFind: detailId });
    this.setState({ findDetail: true });
    this.setState({ findManager: false });
  };

  handleResetFilter = () => {
    this.setState({ managerToFind: "" });
    this.setState({ detailIdToFind: "" });
    this.setState({ findDetail: false });
    this.setState({ findManager: false });
  };

  handleSearch = employee => {
    let matchedEmployee = [
      employee.name,
      employee.sex,
      employee.title,
      employee.startDate,
      employee.officePhone,
      employee.cellPhone,
      employee.sms,
      employee.email,
      employee.managerId
      //   employee.noOfDR
    ];
    let flag = matchedEmployee
      .filter(ele => ele !== undefined)
      .some(ele => {
        return ele.toLowerCase().includes(this.state.matchedText.toLowerCase());
      });
    return flag;
  };

  handleEditEmployee = id => {
    this.props.history.push(`/edit/${id}`);
  };

  handleDeleteEmployee = id => {
    this.props.deleteEmployeeById(id);
  };

  handleAddEmployee = () => {
    this.props.history.push("/create");
  };

  render() {
    const { classes } = this.props;
    const { employees, isLoading, err } = this.props;
    const { order, orderBy } = this.state;
    var employeeToShow = [...employees];
    if (this.state.findManager === true) {
      employeeToShow = employees.filter(
        employee =>
          this.state.managerToFind === "" ||
          employee._id === this.state.managerToFind
      );
    } else if (this.state.findDetail === true) {
      employeeToShow = employees.filter(
        employee => employee.managerId === this.state.detailIdToFind
      );
    }
    if (err) throw err;
    return isLoading ? (
      <Loading />
    ) : (
      <div>
        <Paper className={classes.tool}>
          <Toolbar className={classes.root}>
            <div className={classes.title}>
              <SearchIcon style={{ marginRight: "5px" }} />
              <TextField
                placeholder="search"
                id="search"
                value={this.state.matchedText}
                onChange={this.handleMatchedText}
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
                    onClick={() => this.handleAddEmployee()}
                  >
                    New Employee
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Toolbar>
          <div className={classes.tableWrapper}>
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
              <TableBody>
                {employeeToShow
                  .sort(this.getSorting(order, orderBy))
                  .filter(employee => this.handleSearch(employee))
                  .map(employee => {
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
                          onClick={() =>
                            this.handleFindManager(employee.managerId)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {employee.managerId === undefined ||
                          employee.managerId === ""
                            ? ""
                            : employees.filter(
                                cur => cur._id === employee.managerId
                              )[0].name}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          onClick={
                            employee.noOfDR !== 0
                              ? () => this.handleFindDetail(employee._id)
                              : null
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {employee.noOfDR}
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
    isLoading: state.employeeList.isLoading,
    first: state.employeeList.first,
    err: state.employeeList.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployeeList: () => {
      dispatch(getEmployees());
    },
    deleteEmployeeById: id => {
      dispatch(deleteEmployee(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
