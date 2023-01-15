
import { HYDRATE } from 'next-redux-wrapper';
export default function Class(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case HYDRATE:
      let nextState = action.payload._class; // apply delta from hydration
      return nextState
    // case 'GET_ALL_LIST_STUDENT_CLASS':
    //   return {
    //     ...state,
    //     listStudent: action.payload
    //   }
    case 'ADD_NEW_STUDENT_REST':
      return {
        ...state,
        listStudent: state.listStudent.push(action.data)
      }
    case "GET_STUDENT_CLASS":

      let studentEdit = state.listStudent.filter(student => student.email === action.email);
      if (studentEdit.length) {
        console.log("studentEdit:", studentEdit)
        return {
          ...state,
          editStudent: studentEdit[0]
        }
      }
    // eslint-disable-next-line no-fallthrough
    // case 'EDIT_SAVE_STUDENT_REST':
    //   let data = state.listStudent;

    //   if (data.length) {
    //     for (let i = 0; i < data.length; i++) {
    //       if (data[i].email === action.data.email) {
    //         data[i] = action.data;
    //         break;
    //       }
    //     }
    //     return {
    //       ...state,
    //       editStudent: data
    //     }
    //   }
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
    case 'REMOVE_IMAGE_CLASS':
      console.log("remove")
      return {
        ...state,
        pathFileImage: ""
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
        documentList: [...state.documentList, action.payload],
      }
    case 'GET_ALL_CLASS_SUCCESS':
      return {
        ...state,
        listClass: action.payload
      }
    case 'ADD_NEW_CLASS_SUCCESS':
      return {
        ...state,
        class_id: action.payload.class_id,
        success: true,
        toggleState: 2
      }
    case 'DELETE_DATA':

      return {
        ...state,
        class_id: "",
        nameClass: "",
        moduleClassId: 1,
        description: "",
        dateTimeStart: "",
        dateTimeEnd: "",
        pathFileImage: "",
        scope: 0,
        success: false,
        success1: false,
        upload: false,
        documentList: [],
        exam: "",
        listStudent: [],
        editStudent: "",
        listClass: [],
        arrayProgram: [],
        editLesson: "",
        listIdRemoveDocument: [],
        programCategoryIdsToRemove: [],
        idsLessonToRemove: [],
        idsTaskToRemove: [],
        toggleState: 1,
        classDetail: {
          class_id: "",
          name_class: "",
          tag_class: "",
          scope_class: 0,
          total_students: 0,
          status_class: 1,
          start_time: null,
          end_time: null,
          path_file_image: "",
          arrayProgram: [],
          allCategoryProgram: [],
          module_class_id: 1,
          exam: ""
        }
      }
    case 'DELETE_SUCCESS_ADD_CLASS':
      return {
        ...state,
        success: false,
        success1: false
      }
    case 'ADD_NEW_STUDENT_BY_ID_SUCCESS':
      console.log("seccess");
      return {

        ...state,
        success1: true
      }
    case 'EDIT_STUDENT_BY_ID_SUCCESS':
      return {
        ...state,
        success: true
      }
    case 'DELETE_DOCUMENT_FILE':
      console.log("action:", action.payload)
      return {
        ...state,
        documentList: state.documentList.filter(file => file.file_path_document !== action.payload),
        listIdRemoveDocument: [...state.listIdRemoveDocument, action.id]
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
          indexLesson: newProgramTable5[action.index - 1].createLessonRequestList.length + 1,
          timeDateFinished: ""
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
    case 'DELETE_LESSISON_ACTIVE':
      let arrayLesstion = state.arrayProgram;
      if (arrayLesstion.length) {
        for (let i = 0; i < arrayLesstion[action.index - 1].createLessonRequestList.length; i++) {
          if (arrayLesstion[action.index - 1].createLessonRequestList[i].indexLesson === action.id) {
            arrayLesstion[action.index - 1].createLessonRequestList.splice(i, 1);
            arrayLesstion[action.index - 1].idsLessonToRemove.push(action.lessonId)
            break;
          }
        }
        return {
          ...state,
          arrayProgram: arrayLesstion,
          idsLessonToRemove: [...state.idsLessonToRemove, action.lessonId]
        }
      }
    // eslint-disable-next-line no-fallthrough
    case 'DELETE_LESSISON_TASK':
      let arrayProgram2 = state.arrayProgram;

      if (arrayProgram2.length) {
        for (let i = 0; i < arrayProgram2[action.index - 1].createTaskRequestList.length; i++) {
          if (arrayProgram2[action.index - 1].createTaskRequestList[i].index === action.id) {
            arrayProgram2[action.index - 1].idsTaskToRemove.push(action.taskId)
            arrayProgram2[action.index - 1].createTaskRequestList.splice(i, 1)
            break;
          }
        }

        return {
          ...state,
          arrayProgram: arrayProgram2,
          idsTaskToRemove: [...state.idsTaskToRemove, action.taskId]
        }
      }
    case 'HANDLE_DELETE_PROGRAM_CLASS':
      return {
        ...state,
        arrayProgram: state.arrayProgram.filter(item => item.program_category_id !== action.id),
        programCategoryIdsToRemove: [...state.programCategoryIdsToRemove, action.id]
      }
    case 'HANDLE_SAVE_EDIT_PROGRAM':
      console.log("actionEdit:", action);
      return {
        ...state
      }
    case 'NEXT_PAGE_ADD_CLASS':
      return {
        ...state,
        toggleState: 2
      }
    case 'GET_CLASS_INFORMATION_BY_ID_SUCCESS':
      console.log("action:", action.payload)
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
    case 'GET_CLASS_INFORMATION_BY_ID_STUDENT_SUCCESS':
      return {
        ...state,
        class_id: action.payload.class_id,
        classDetail: {
          ...state.classDetail,
          class_id: action.payload.class_id,
          tag_class: action.payload.tag_class,
          path_file_image: action.payload.path_image,
          documentList: action.payload.documents
        }
      }
    case
      'GET_CLASS_DOCUMENT_BY_ID_SUCCESS':
      return {
        ...state, classDetail: {
          ...state.classDetail,
          documentList: action.payload.documents_response,
          description: action.payload.description,
          module_class_id: action.payload.module_class_id,
          start_time: action.payload.start_date,
          end_time: action.payload.end_date,

        }

      }
    case 'CREATE_PROGRAM_BY_ID_SUCCESS':
      return {
        ...state,
        success: true
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
    case 'GET_ALL_STUDENT_BY_ID_SUCCESS':
      return {
        ...state,
        listStudent: action.payload
      }
    case 'GET_ALL_INFORMATION_CLASS_BY_ID':
      return {
        ...state,
        nameClass: action.payload.name_class,
        moduleClassId: action.payload.module_class_id,
        description: action.payload.description,
        dateTimeStart: action.payload.start_time,
        dateTimeEnd: action.payload.end_time,
        documentList: action.payload.documentList,
        pathFileImage: action.payload.path_file_image,
      }
    case 'GET_ALL_EXAM_BY_ID_SUCCESS':
      return {
        ...state,
        classDetail: {
          ...state.classDetail,
          exam: action.payload
        }
      }
    case 'GET_ALL_PROGRAM_CLASS_BY_ID':
      let payloadData = action.payload;
      let DataArayProgram = [];
      if (payloadData.length) {
        payloadData.forEach((item, index) => {
          let data = {
            classId: item.class_id,
            toggleStateAddClass: 1,
            nameProgramCategory: item.name_program_category,
            index: index + 1,
            program_category_id: item.program_category_id
          }
          let createLessonRequestList = [];
          let createTaskRequestList = [];
          if (item.lessons.length) {

            item.lessons.forEach((ele, index1) => {
              createLessonRequestList.push({
                nameLesson: ele.name_lesson,
                pathLesson: ele.path_lesson && ele.path_lesson.replaceAll("\\", "/"),
                typeLesson: ele.type_lesson,
                timeDuration: ele.time_duration,
                scopeLesson: ele.scope_lesson,
                indexLesson: index1 + 1,
                lessonId: ele.id_lesson,
                descriptionLesson: ele.description,

              })
            })
          }
          if (item.tasks.length) {

            item.tasks.forEach((ele, index1) => {
              createTaskRequestList.push({
                nameTask: ele.name_task,
                typeTask: ele.type_task,
                descriptionTask: ele.description_task,
                timeDurationTask: ele.time_duration_task,
                isRequireFinishTask: ele.is_require_finish_task,
                index: index1 + 1,
                taskId: ele.id_task,
                typeGroupStudent: ele.typeGroupStudent
              })
            })
          }
          data.createLessonRequestList = createLessonRequestList;
          data.createTaskRequestList = createTaskRequestList;
          data.idsTaskToRemove = [];
          data.idsLessonToRemove = [];
          DataArayProgram.push(data);
        });
      }
      return {
        ...state,
        arrayProgram: DataArayProgram
      }
    case 'GET_ALL_ANALITIC_CLASS_SUCCESS':
      let dataAnalytic = [];
      dataAnalytic.push(action.payload);
      console.log("dataAnalytic:", dataAnalytic);
      if (action.payload) {
        return {
          ...state,
          classDetail: {
            ...state.classDetail,
            analytic: action.payload
          }
        }
      }
    default:
      return state;
  }
}
