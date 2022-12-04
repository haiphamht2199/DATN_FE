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
      console.log("data:", action.data)
      return {
        ...state,
        listStudent: state.listStudent.push(action.data)
      }
    case "GET_STUDENT_CLASS":

      let studentEdit = state.listStudent.filter(student => student.id === action.id);
      console.log("studentEdit:", studentEdit)
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
            console.log("action:", action.data)
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
    default:
      return state;
  }
}
