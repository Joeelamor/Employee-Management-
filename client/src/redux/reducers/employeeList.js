const initState = {
  employees: [],
  hasMoreItems: true,
  isLoading: false,
  err: null
};

const employeeList = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_EMPLOYEES_REQUEST":
      return {
        ...state,
        isLoading: true
      };

    case "FETCH_EMPLOYEES_SUCCESS":
      console.log(action.payload);
      if (action.payload.offset === 0) {
        return {
          ...state,
          isLoading: false,
          err: null,
          employees: action.payload.employees,
          hasMoreItems: action.payload.hasMoreItems
        };
      } else {
        return {
          ...state,
          isLoading: false,
          err: null,
          employees: [...state.employees, ...action.payload.employees],
          hasMoreItems: action.payload.hasMoreItems
        };
      }

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
        isLoading: false,
        err: null,
        hasMoreItems: true,
        employees: []
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
        isLoading: false,
        err: null,
        hasMoreItems: true,
        employees: []
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
        employees: [],
        isLoading: false,
        err: null,
        hasMoreItems: true
      };

    case "EDIT_EMPLOYEE_FAILURE":
      return {
        ...state,
        isLoading: false,
        err: action.err
      };
    case "RESET_MORE_ITEMS_SUCCESS":
      return {
        employees: [],
        hasMoreItems: true,
        isLoading: false,
        err: null
      };

    default:
      return state;
  }
};

export default employeeList;
