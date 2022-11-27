import { combineReducers } from "redux";
import lession from './lession';
import menu from './menu';
export default combineReducers({
 lession: lession,
 menu: menu
})