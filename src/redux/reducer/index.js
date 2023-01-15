import { combineReducers } from "redux";
import lession from './lession';
import menu from './menu';
import user from './user';
import modal from './modal';
import _class from './class';
import moduleClass from './moduleClass';
import student from './student';
import showLoading from './showLoading';
export default combineReducers({
 lession: lession,
 menu: menu,
 user: user,
 modal: modal,
 _class: _class,
 moduleClass: moduleClass,
 student: student,
 showLoading: showLoading
})