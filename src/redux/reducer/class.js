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
        pathFileImage: action.payload
      }
    case "CHANGE_NAME_LESSION":
      return {
        ...state,
        nameClass: action.value
      }
    case "CHANGE_MAJOR":
      return {
        ...state,
        moduleClass: action.value
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
    default:
      return state;
  }
}
