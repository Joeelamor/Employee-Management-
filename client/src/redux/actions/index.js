import axios from 'axios';

const getEmployeesRequest = () => {
    return {
        type: 'FETCH_EMPLOYEES_REQUEST'
    };
};

const getEmployeeSuccess = response => {
    return {
        type: 'FETCH_EMPLOYEES_SUCCESS',
        employees: response.data.employees
    };
};

const getEmployeeFail = err => {
    return {
        type: 'FETCH_EMPLOYEES_FAILURE',
        err: err
    };
};

const addEmployeeRequest = () => {
    return {
        type: 'ADD_EMPLOYEE_REQUEST'
    };
};

const addEmployeeSuccess = response => {
    return {
        type: 'ADD_EMPLOYEE_SUCCESS',
        employee: response.data.employee
    };
};

const addEmployeeFail = err => {
    return {
        type: 'ADD_EMPLOYEE_FAILURE',
        err: err
    };
};

const editEmployeeRequest = () => {
    return {
        type: 'EDIT_EMPLOYEE_REQUEST'
    };
};

const editEmployeeSuccess = response => {
    return {
        type: 'EDIT_EMPLOYEE_SUCCESS',
        employee: response.data.employee
    };
};

const editEmployeeFail = err => {
    return {
        type: 'EDIT_EMPLOYEE_FAILURE',
        err: err
    };
};

const deleteEmployeeRequest = () => {
    return {
        type: 'DELETE_EMPLOYEE_REQUEST'
    };
};

const deleteEmployeeSuccess = response => {
    return {
        type: 'DELETE_EMPLOYEE_SUCCESS',
        employee: response.data.employee
    };
};

const deleteEmployeeFail = err => {
    return {
        type: 'DELETE_EMPLOYEE_FAILURE',
        err: err
    };
};

export const getEmployees = () => {
    return (dispatch) => {
        dispatch(getEmployeesRequest());
        axios.get('http://localhost:8080/api/employees/get')
        .then(response => {
            dispatch(getEmployeeSuccess(response));
        })
        .catch(err => {
            dispatch(getEmployeeFail(err))
        });
    }
}

export const createEmployee = employee => {
    return (dispatch) => {
        dispatch(addEmployeeRequest());
        axios.post('http://localhost:8080/api/employees/insert', employee)
        .then(response => {
            dispatch(addEmployeeSuccess(response));
        })
        .catch(err => {
            dispatch(addEmployeeFail(err));
        });
    }
};


export const editCurrentEmployee = (id, employee) => {
    return (dispatch) => {
        dispatch(editEmployeeRequest());
        axios.put(`http://localhost:8080/api/employees/update/${id}`, employee)
        .then(response => {
            dispatch(editEmployeeSuccess(response));
        })
        .catch(err => {
            dispatch(editEmployeeFail(err))
        });
    }
}

export const deleteEmployee = id => {
    return (dispatch) => {
        dispatch(deleteEmployeeRequest());
        axios.delete(`http://localhost:8080/api/employees/delete/${id}`)
        .then(response => {
            dispatch(deleteEmployeeSuccess(response));
        })
        .catch(err => {
            dispatch(deleteEmployeeFail(err));
        });
    }
};
