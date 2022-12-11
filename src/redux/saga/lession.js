import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from '../../helper/axios';
import axiosImage from '../../helper/axiosImage'

// eslint-disable-next-line require-yield
function* getLession() {
 try {
 } catch (error) {

 }
}

function* uploadImageClass(action) {
 try {

  const image = yield all([axiosImage.post('/teacher/classes/create_file_image_class', action.payload)]);;
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
function* addNewClass(action) {
 try {

  let data = action.payload;
  let documentList = [];
  if (data.documentList.length) {
   data.documentList.map(item => {
    let newData = {
     nameDocumentClass: item.nameDocumentClass,
     pathFileDocument: item.pathFileDocument
    }
    documentList.push(newData)
   })
  }
  let newClass = {
   nameClass: data.nameClass,
   moduleClassId: data.moduleClassId,
   description: data.description,
   dateTimeStart: data.dateTimeStart,
   dateTimeEnd: data.dateTimeEnd,
   pathFileImage: data.pathFileImage,
   scope: data.scope.toString(),
   documentList: documentList

  }
  const newClassRes = yield all([axios.post('/teacher/classes/create_class', newClass)]);
  let dataNewClass = newClassRes[0].data;
  if (dataNewClass.code === 200) {
   yield put({
    type: "ADD_NEW_CLASS_SUCCESS",
    payload: dataNewClass.data
   })
  }

 } catch (error) {

 }
}
function* getAllClass() {
 try {
  const getAllClassRes = yield all([axios.get('/teacher/sys/class_category/get_all_class_category?page=0&size=100')]);
  let data = getAllClassRes[0].data;
  console.log("AllClass:", data);

  if (data.code === 200) {
   let AllClass = data.data.results;
   if (AllClass.length) {
    yield put({
     type: "GET_ALL_CLASS_SUCCESS",
     payload: AllClass
    })
   }
  }
 } catch (error) {

 }

}
export default function* lession() {
 yield takeLatest('GET_LESSIONS', getLession);
 yield takeLatest('UPLOAD_IMAGE_CLASS', uploadImageClass)
 yield takeLatest('GET_ALL_MODULE_CLASS', getAllModuleClass);
 yield takeLatest('ADD_NEW_CLASS_REST', addNewClass);
 yield takeLatest('GET_ALL_CLASS_REST', getAllClass)
}