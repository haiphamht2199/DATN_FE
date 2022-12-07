import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
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
   localStorage.setItem('token', userRes.data.access_token)
   yield put({
    type: "SIGNIN_SUCCESS",
    token: userRes.data.access_token,
    message: userRes.message
   })
  }
 } catch (error) {

 }
}


export default function* signin() {
 yield takeLatest('SIGNIN_REQUEST', handleLogin);
}