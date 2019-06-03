import axios from "axios";

const getEmployeesRequest = () => {
  return {
    type: "FETCH_EMPLOYEES_REQUEST"
  };
};

const getEmployeeSuccess = (offset, response) => {
  return {
    type: "FETCH_EMPLOYEES_SUCCESS",
    payload: { ...response.data, offset: offset }
  };
};

const getEmployeeFail = err => {
  return {
    type: "FETCH_EMPLOYEES_FAILURE",
    err: err
  };
};

const addEmployeeRequest = () => {
  return {
    type: "ADD_EMPLOYEE_REQUEST"
  };
};

const addEmployeeSuccess = response => {
  return {
    type: "ADD_EMPLOYEE_SUCCESS"
  };
};

const addEmployeeFail = err => {
  return {
    type: "ADD_EMPLOYEE_FAILURE",
    err: err
  };
};

const editEmployeeRequest = () => {
  return {
    type: "EDIT_EMPLOYEE_REQUEST"
  };
};

const editEmployeeSuccess = response => {
  return {
    type: "EDIT_EMPLOYEE_SUCCESS"
  };
};

const editEmployeeFail = err => {
  return {
    type: "EDIT_EMPLOYEE_FAILURE",
    err: err
  };
};

const deleteEmployeeRequest = () => {
  return {
    type: "DELETE_EMPLOYEE_REQUEST"
  };
};

const deleteEmployeeSuccess = response => {
  return {
    type: "DELETE_EMPLOYEE_SUCCESS"
  };
};

const deleteEmployeeFail = err => {
  return {
    type: "DELETE_EMPLOYEE_FAILURE",
    err: err
  };
};

const resetHasMoreItemsSuccess = () => {
  return {
    type: "RESET_MORE_ITEMS_SUCCESS"
  };
};

export const resetHasMoreItems = () => {
  return dispatch => {
    dispatch(resetHasMoreItemsSuccess());
  };
};

export const getEmployees = (
  offset,
  limit,
  orderBy,
  order,
  search,
  employeeId,
  managerId
) => {
  return dispatch => {
    dispatch(getEmployeesRequest());
    const url =
      "http://localhost:8080/api/employees/get?" +
      ("offset=" + offset + "&") +
      ("limit=" + limit + "&") +
      ("orderBy=" + orderBy + "&") +
      ("order=" + order) +
      (search ? "&search=" + search : "") +
      (employeeId ? "&employeeId=" + employeeId : "") +
      (managerId ? "&managerId=" + managerId : "");
    axios
      .get(url)
      .then(response => {
        dispatch(getEmployeeSuccess(offset, response));
      })
      .catch(err => {
        dispatch(getEmployeeFail(err));
      });
  };
};

export const createEmployee = (employee, history) => {
  return dispatch => {
    dispatch(addEmployeeRequest());
    axios
      .post("http://localhost:8080/api/employees/insert", employee)
      .then(response => {
        dispatch(addEmployeeSuccess(response));
        history.push("/");
      })
      .catch(err => {
        dispatch(addEmployeeFail(err));
      });
  };
};

export const editCurrentEmployee = (id, employee, history) => {
  return dispatch => {
    dispatch(editEmployeeRequest());
    axios
      .put(`http://localhost:8080/api/employees/update/${id}`, employee)
      .then(response => {
        dispatch(editEmployeeSuccess(response));
        history.push("/");
      })
      .catch(err => {
        dispatch(editEmployeeFail(err));
      });
  };
};

export const deleteEmployee = id => {
  return dispatch => {
    dispatch(deleteEmployeeRequest());
    axios
      .delete(`http://localhost:8080/api/employees/delete/${id}`)
      .then(response => {
        console.log("nihao");
        dispatch(deleteEmployeeSuccess(response));
      })
      .catch(err => {
        dispatch(deleteEmployeeFail(err));
      });
  };
};
