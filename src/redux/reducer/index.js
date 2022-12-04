import { combineReducers } from "redux";
import lession from './lession';
import menu from './menu';
import user from './user';
import modal from './modal';
import _class from './class';
export default combineReducers({
 lession: lession,
 menu: menu,
 user: user,
 modal: modal,
 _class: _class
})