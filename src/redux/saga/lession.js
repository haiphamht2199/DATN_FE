import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from '../../helper/axios'

// eslint-disable-next-line require-yield
function* getLession() {
 try {

  console.log("hello")
 } catch (error) {

 }
}
function* uploadImageClass(action) {
 try {
  const formData = new FormData();
  formData.append("file_image_class", action.payload.file_image_class);
  console.log("formData:", formData);
  console.log("hello:",action)
  const image = yield all([axios.post('teacher/classes/create_file_image_class', formData)]);

 } catch (error) {

 }
}
export default function* lession() {
 yield takeLatest('GET_LESSIONS', getLession);
 yield takeLatest('UPLOAD_IMAGE_CLASS', uploadImageClass)
}