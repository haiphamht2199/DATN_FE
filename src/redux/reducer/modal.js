import { HYDRATE } from 'next-redux-wrapper';
export default function Modal(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case HYDRATE:
      let nextState = action.payload.modal; // apply delta from hydration
      return nextState
    case 'CHANGE_MODAL_EDIT_STUDENT':
      console.log("actions:", action)
      return {
        ...state,
        editStudent: true
      }
    case 'CHANGE_CLOSE_MODAL':
      return {
        ...state,
        editStudent: false
      }
    case 'CLOSE_MODAL_EDIT_STUDENT':
      return {
        ...state,
        editStudent: false
      }
    default:
      return state;
  }
}