import { combineReducers } from "redux";
import employeeList from "./employeeList";
import managerList from "./managerList";

const reducers = combineReducers({
  employeeList,
  managerList
});

export default reducers;
