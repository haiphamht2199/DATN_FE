import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Axios from '../../helper/axios'
let config = {
 headers: {
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*',
 }
}



// eslint-disable-next-line require-yield
function* handleLogin(action) {
 try {

  const user = yield all([axios.post('http://localhost:8080/api/auth/login', action.payload)]);
  let userRes = user[0].data;
  if (userRes.code === 200) {
   localStorage.setItem('token', userRes.data.access_token);
   if (localStorage.getItem('token')) {
    let dataRes = yield all([axios.get('http://localhost:8080/api/auth/current', {
     headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': "Bearer " + userRes.data.access_token,
      'Content-Type': 'application/json',
      'accept': 'application/json'
     }
    })]);
    if (dataRes[0].data.code === 200) {
     localStorage.setItem('student', dataRes[0].data.data.role_name);
     yield put({
      type: "SIGNIN_SUCCESS",
      token: userRes.data.access_token,
      payload: dataRes[0].data.data
     })
    }

   }

  }
 } catch (error) {

 }
}

function* getAllCourseStudent() {
 try {
  let listCourseRes = yield all([Axios.get('/student/home_page/find_all')]);
  console.log("listCourseRes:", listCourseRes);
  let listCourse = listCourseRes[0].data;
  if (listCourse.code === 200) {
   yield put({
    type: "GETT_ALL_COURSE_SUCCESS",
    payload: listCourse.data

   })
  }
 } catch (error) {

 }
}
function* getCourseDetail(action) {
 try {
  console.log("action:", action)
  let classRes = yield all([Axios.get(`/student/classes/details?tag_class=${action.payload}`)]);
  console.log("classRes:", classRes)
  let classDetail = classRes[0].data;
  if (classDetail.code === 200) {
   yield put({
    type: "GET_CLASS_INFORMATION_BY_ID_STUDENT_SUCCESS",
    payload: classDetail.data
   })
  }
 } catch (error) {

 }
}
function* getAllProgram(action) {
 try {
  let ProgramRes = yield all([Axios.get(`/student/classes/list_program_categories?class_id=${action.payload}`)]);
  let ProData = ProgramRes[0].data;
  console.log("ProData:", ProData)
  if (ProData.code === 200) {
   yield put({
    type: "GET_CLASS_PROGRAM_BY_ID_SUCCESS",
    payload: ProData.data
   })
  }

 } catch (error) {

 }
}
export default function* signin() {
 yield takeLatest('SIGNIN_REQUEST', handleLogin);
 yield takeLatest('GET_ALL_COURSE_STUDENT', getAllCourseStudent);
 yield takeLatest('GET_DETAIL_INFORMATION_CLASS_STUDENT_BY_ID', getCourseDetail);
 yield takeLatest('GET_DETAIL_INFORMATION_PROGRAM_STUDENT_CLASS_BY_ID', getAllProgram)
}