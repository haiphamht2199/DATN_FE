import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';


// eslint-disable-next-line require-yield
function* getLession() {
 try {

  console.log("hello")
 } catch (error) {

 }
}
export default function* lession() {
 yield takeLatest('GET_LESSIONS', getLession);
}