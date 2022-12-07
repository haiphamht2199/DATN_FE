import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from '../../helper/axios'

// eslint-disable-next-line require-yield
function* getLession() {
 try {
 } catch (error) {

 }
}
const addItems = (cartItems) => fetch("http://localhost:8080/api/v1/teacher/module_class", {
 method: 'POST',
 headers: {
  'Content-Type': 'application/json'
 },
 body: JSON.stringify(cartItems)
}).catch((error) => {
 console.error('Error:', error);
});
function* uploadImageClass(action) {
 try {

  const image = yield all([axios.post('/teacher/classes/create_file_image_class', action.payload)]);;
  let data = image[0].data;
  if (data.code === 200) {
   yield put({
    type: "UPLOAD_IMAGE_CLASS_SUCCESS",
    payload: data.data
   })
  }
 } catch (error) {

 }
}
function* getAllModuleClass(action) {
 try {
  const modulesClassRes = yield all([axios.get('/teacher/module_class')]);
  let data = modulesClassRes[0].data;

  if (data.code === 200) {
   let modulesClass = data.data;
   if (modulesClass.length) {
    yield put({
     type: "GET_ALL_MODULES_SUCCESS",
     payload: modulesClass
    })
   }
  }
 } catch (error) {

 }

}
export default function* lession() {
 yield takeLatest('GET_LESSIONS', getLession);
 yield takeLatest('UPLOAD_IMAGE_CLASS', uploadImageClass)
 yield takeLatest('GET_ALL_MODULE_CLASS', getAllModuleClass)
}