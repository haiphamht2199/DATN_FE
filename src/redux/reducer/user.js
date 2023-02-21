import { HYDRATE } from 'next-redux-wrapper';
export default function user(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case HYDRATE:
      let nextState = action.payload.menu; // apply delta from hydration
      return nextState
    case 'SIGNIN_SUCCESS':
      let student = false;
      return {
        ...state,
        token: action.token,
        message: action.message,
        student: action.payload.role_name,
        userId: parseInt(action.payload.user_id)
      }
    case 'AUTO_LOGIN':
      return {
        ...state,
        token: action.payload,
        student: action.student,
        userId: parseInt(action.user_id)
      }
    case 'DELETE_TOKEN':
      return {
        ...state,
        token: '',
        userId: '',
        student: ''
      }


    default:
      return state;
  }
}