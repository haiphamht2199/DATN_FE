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
  console.log("newClass:", newClass)
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
function* createProgramByClass(action) {
 try {
  let arrayProgram = action.payload.arrayProgram;
  console.log("arrayProgram:", arrayProgram)
  if (arrayProgram.length) {
   let programRes = yield all([axios.post('/teacher/program_category/create', arrayProgram)]);
   if (programRes.code === 200) {
    yield put({
     type: "CREATE_PROGRAM_BY_ID_SUCCESS",
    })
   }
  }
 } catch (error) {

 }
}
function* getClassDetailById(action) {
 try {
  let classRes = yield all([axios.get(`/teacher/sys/class_category/get_class_detail?class_id=${action.payload}`)]);
  let classDetail = classRes[0].data;
  if (classDetail.code === 200) {
   yield put({
    type: "GET_CLASS_INFORMATION_BY_ID_SUCCESS",
    payload: classDetail.data
   })
  }
 } catch (error) {

 }
}
function* getdocumentClassById(action) {
 try {
  let documentRes = yield all([axios.get(`/teacher/sys/class_category/get_information_detail_class?class_id=${action.payload}`)]);
  let classDetail = documentRes[0].data;
  if (classDetail.code === 200) {
   yield put({
    type: "GET_CLASS_DOCUMENT_BY_ID_SUCCESS",
    payload: classDetail.data
   })
  }
 } catch (error) {

 }
}
function* getAllProgramByClassId(action) {
 try {
  let ProgramRes = yield all([axios.get(`/teacher/sys/class_category/get_information_detail_program_categories?class_id=${action.payload}`)]);
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
function* getAllcategoryProgramByClassId(action) {
 try {
  let AllProgramCatrgoryRes = yield all([axios.get(`/teacher/sys/program_category/find_all_program_categories?page=0&size=100&classId=${action.payload}`)]);
  let AllCategory = AllProgramCatrgoryRes[0].data;
  console.log("AllCategory:", AllCategory)
  if (AllCategory.code === 200) {
   yield put({
    type: "GET_ALL_CATEGORY_PROGRAM_BY_ID_SUCCESS",
    payload: AllCategory.data.results
   })
  }
 } catch (error) {

 }
}
function* getAllStudentByClassId(action) {
 try {
  let listStudentRes = yield all([axios.get(`/teacher/manager_student?page=0&size=10&classId=${action.payload}`)]);
  console.log("listStudentRes:", listStudentRes);
  let AllStudent = listStudentRes[0].data;
  if (AllStudent.code === 200) {
   yield put({
    type: "GET_ALL_STUDENT_BY_ID_SUCCESS",
    payload: AllStudent.data.results
   })
  }
 } catch (error) {

 }
}
function* saveEditStudentByClassId(action) {
 try {
  console.log("action.data", action.data)
  let StudentRes = yield all([axios.put('/teacher/manager_student/edit_class_student', action.data)]);
  let AllStudent = StudentRes[0].data;
  if (AllStudent.code === 200) {
   yield put({
    type: "EDIT_STUDENT_BY_ID_SUCCESS",
   })
  }
 } catch (error) {

 }
}
function* addNewStudentClassId(action) {
 try {
  let NewStudentRes = yield all([axios.post('/teacher/manager_student/create_new_student', action.data)]);
  console.log("NewStudentRes:", NewStudentRes)
  let AllStudent = NewStudentRes[0].data;
  if (AllStudent.code === 200) {
   yield put({
    type: "ADD_NEW_STUDENT_BY_ID_SUCCESS",
   })
  }
 } catch (error) {

 }
}
export default function* lession() {
 yield takeLatest('GET_LESSIONS', getLession);
 yield takeLatest('UPLOAD_IMAGE_CLASS', uploadImageClass)
 yield takeLatest('GET_ALL_MODULE_CLASS', getAllModuleClass);
 yield takeLatest('ADD_NEW_CLASS_REST', addNewClass);
 yield takeLatest('GET_ALL_CLASS_REST', getAllClass);
 yield takeLatest('HANDLE_CREATE_PROGRAM_BY_CLASS', createProgramByClass);
 yield takeLatest('GET_DETAIL_INFORMATION_CLASS_BY_ID', getClassDetailById);
 yield takeLatest('GET_DETAIL_INFORMATION_AND_DOCUMENT_CLASS_BY_ID', getdocumentClassById);
 yield takeLatest('GET_DETAIL_INFORMATION_PROGRAM_CLASS_BY_ID', getAllProgramByClassId);
 yield takeLatest('GET_ALL_PROGRAM_CATEGERY_CLASS_BY_ID', getAllcategoryProgramByClassId);
 yield takeLatest('GET_ALL_LIST_STUDENT_CLASS_BY_ID', getAllStudentByClassId);
 yield takeLatest('EDIT_SAVE_STUDENT_BY_CLASS_ID_REST', saveEditStudentByClassId);
 yield takeLatest('ADD_NEW_STUDENT_CLASS_ID_ASYNC', addNewStudentClassId)
}