
import { HYDRATE } from 'next-redux-wrapper';
export default function Class(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case HYDRATE:
      let nextState = action.payload._class; // apply delta from hydration
      return nextState
    case 'GET_ALL_LIST_STUDENT_CLASS':
      return {
        ...state,
        listStudent: action.payload
      }
    case 'ADD_NEW_STUDENT_REST':
      return {
        ...state,
        listStudent: state.listStudent.push(action.data)
      }
    case "GET_STUDENT_CLASS":

      let studentEdit = state.listStudent.filter(student => student.id === action.id);
      if (studentEdit.length) {
        return {
          ...state,
          editStudent: studentEdit[0]
        }
      }
    // eslint-disable-next-line no-fallthrough
    case 'EDIT_SAVE_STUDENT_REST':
      let data = state.listStudent;

      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === action.data.id) {
            data[i] = action.data;
            break;
          }
        }
        return {
          ...state,
          editStudent: data
        }
      }
    // eslint-disable-next-line no-fallthrough
    case 'DELETE_EDIT_STUDENT':
      return {
        ...state,
        editStudent: ""
      }
    case 'UPLOAD_IMAGE_CLASS_SUCCESS':
      console.log("action:", action)
      return {
        ...state,
        pathFileImage: action.payload.replaceAll("\\", "/")
      }
    case "CHANGE_NAME_LESSION":
      return {
        ...state,
        nameClass: action.value
      }
    case "CHANGE_MAJOR":
      return {
        ...state,
        moduleClassId: action.value
      }
    case 'CHANGE_DECRIPTION':
      return {
        ...state,
        description: action.description
      }
    case 'CHANGE_START_DATE':
      return {
        ...state,
        dateTimeStart: action.value
      }
    case 'CHANGE_END_DATE':
      return {
        ...state,
        dateTimeEnd: action.value

      }
    case 'UPLOAD_DOCUMENT_SUCCESS':
      return {
        ...state,
        documentList: [...state.documentList, action.payload]
      }
    case 'GET_ALL_CLASS_SUCCESS':
      return {
        ...state,
        listClass: action.payload
      }
    case 'ADD_NEW_CLASS_SUCCESS':
      return {
        ...state,
        class_id: action.payload.class_id
      }
    case 'SETUP_PROGRAM_REST':
      let setupProgram = {
        classId: state.class_id ? state.class_id : "",
        toggleStateAddClass: 1,
        nameProgramCategory: '',
        index: 1,
        createLessonRequestList: [],
        createTaskRequestList: []
      }
      return {
        ...state,
        arrayProgram: [...state.arrayProgram, setupProgram]
      }
    case 'TOGGLE_TAB_ADD_CLASS':
      let newProgramTable = [...state.arrayProgram];
      newProgramTable[action.payload.indexProgram - 1].toggleStateAddClass = action.payload.index;
      return {
        ...state,
        arrayProgram: newProgramTable
      }
    case 'ONCHANGE_NAME_LESSION':
      let newProgramTable1 = [...state.arrayProgram];
      newProgramTable1[action.index - 1].createLesson.nameLesson = action.value;
      return {
        ...state,
        arrayProgram: newProgramTable1
      }
    case 'ONCHANGE_NAME_ACTIVE':
      let newProgramTable2 = [...state.arrayProgram];
      newProgramTable2[action.index - 1].createTask.nameTask = action.value;
      return {
        ...state,
        arrayProgram: newProgramTable2
      }
    case 'HANDLE_ADD_ANOTHER_ROW':
      let newProgramTable3 = [...state.arrayProgram];

      newProgramTable3.push({
        classId: state.class_id ? state.class_id : "",
        toggleStateAddClass: 1,
        nameProgramCategory: '',
        index: newProgramTable3[newProgramTable3.length - 1].index + 1,
        createLessonRequestList: [],
        createTaskRequestList: []
      });
      return {
        ...state,
        arrayProgram: newProgramTable3
      }
    case 'HANDLE_NEW_NAME_PROGRAM':
      let newProgramTable4 = [...state.arrayProgram];
      newProgramTable4[action.index - 1].nameProgramCategory = action.value;
      return {
        ...state,
        arrayProgram: newProgramTable4
      }
    case 'HANDLE_SAVE_NEW_PROGRAM':
      let newProgramTable5 = action.arrayLesstion;
      if (action.nameLession) {
        let _data = {
          nameLesson: action.nameLession,
          pathLesson: '',
          descriptionLesson: '',
          typeLesson: "0",
          timeDuration: '',
          scopeLesson: "0",
          indexLesson: newProgramTable5[action.index - 1].createLessonRequestList.length + 1
        }
        newProgramTable5[action.index - 1].createLessonRequestList.push(_data);
        // newProgramTable5[action.index - 1].createLesson.errClass = false;
      }

      if (action.nameActive) {
        let createTask = {
          nameTask: action.nameActive,
          typeTask: "1",
          typeGroupStudent: 1,
          descriptionTask: '',
          timeDurationTask: 0,
          isRequireFinishTask: "0",
          index: newProgramTable5[action.index - 1].createTaskRequestList.length + 1
        }
        // newProgramTable5[action.index - 1].createTask.errActive = false;
        newProgramTable5[action.index - 1].createTaskRequestList.push(createTask);
      }
      return {
        ...state,
        arrayProgram: newProgramTable5
      }
    case 'GET_EIDT_LESSON':
      return {
        ...state,
        editLesson: action.payload
      }
    case 'HANDLE_SAVE_EDIT_PROGRAM':
      console.log("actionEdit:", action)
    case 'GET_CLASS_INFORMATION_BY_ID_SUCCESS':
      return {
        ...state,
        class_id: action.payload.class_id,
        classDetail: {
          ...state.classDetail,
          class_id: action.payload.class_id,
          name_class: action.payload.name_class,
          tag_class: action.payload.tag_class,
          scope_class: action.payload.scope_class,
          total_students: action.payload.total_students,
          status_class: action.payload.status_class,
          start_time: action.payload.start_time,
          end_time: action.payload.end_time,
          path_file_image: action.payload.path_file_image
        }
      }
    case
      'GET_CLASS_DOCUMENT_BY_ID_SUCCESS':
      return {
        ...state, classDetail: {
          ...state.classDetail,
          documentList: action.payload.documents_response,
          description: action.payload.description
        }

      }
    case 'GET_CLASS_PROGRAM_BY_ID_SUCCESS':
      console.log("actionPr:", action)
      return {
        ...state,
        classDetail: {
          ...state.classDetail,
          arrayProgram: action.payload
        }

      }
    case 'GET_ALL_CATEGORY_PROGRAM_BY_ID_SUCCESS':
      console.log('action:', action)
      return {
        ...state,
        classDetail: {
          ...state.classDetail,
          allCategoryProgram: action.payload
        }
      }
    default:
      return state;
  }
}
