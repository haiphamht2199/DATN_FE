import { combineReducers } from "redux";
import lession from './lession';
import menu from './menu';
import user from './user';
import modal from './modal';
import _class from './class';
import moduleClass from './moduleClass';
export default combineReducers({
 lession: lession,
 menu: menu,
 user: user,
 modal: modal,
 _class: _class,
 moduleClass: moduleClass
})