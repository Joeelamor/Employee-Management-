const initState = {
  managers: [],
  err: null
};

const managerList = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_MANAGER_REQUEST":
      return {
        ...state
      };

    case "FETCH_MANAGER_SUCCESS":
      return {
        err: null,
        managers: action.managers
      };

    case "FETCH_MANAGER_FAILURE":
      return {
        ...state,
        err: action.err
      };
    default:
      return state;
  }
};
export default managerList;
