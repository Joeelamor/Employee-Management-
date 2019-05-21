const initState = { employees: [], isLoading: false, err: null, first: true };

const employeeList = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_EMPLOYEES_REQUEST":
      return {
        ...state,
        isLoading: true
      };

    case "FETCH_EMPLOYEES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        err: null,
        employees: action.employees,
        first: false
      };

    case "FETCH_EMPLOYEES_FAILURE":
      return {
        ...state,
        isLoading: false,
        err: action.err
      };

    case "ADD_EMPLOYEE_REQUEST":
      return {
        ...state,
        isLoading: true
      };

    case "ADD_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employees: [...state.employees, action.employee],
        isLoading: false,
        err: null
      };

    case "ADD_EMPLOYEE_FAILURE":
      return {
        ...state,
        isLoading: false,
        err: action.err
      };

    case "DELETE_EMPLOYEE_REQUEST":
      return {
        ...state,
        isLoading: true
      };

    case "DELETE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employees: state.employees.filter(
          employee => employee._id !== action.employee._id
        ),
        isLoading: false,
        err: null
      };

    case "DELETE_EMPLOYEE_FAILURE":
      return {
        ...state,
        isLoading: false,
        err: action.err
      };

    case "EDIT_EMPLOYEE_REQUEST":
      return {
        ...state,
        isLoading: true
      };

    case "EDIT_EMPLOYEE_SUCCESS":
      return {
        employees: state.employees.map(employee => {
          if (employee._id === action.employee._id) {
            return { ...action.employee };
          }
          return employee;
        }),
        isLoading: false,
        err: null
      };

    case "EDIT_EMPLOYEE_FAILURE":
      return {
        ...state,
        isLoading: false,
        err: action.err
      };

    default:
      return state;
  }
};

export default employeeList;
