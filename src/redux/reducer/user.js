import { HYDRATE } from 'next-redux-wrapper';
export default function user(state = {}, action) {
 // eslint-disable-next-line default-case
 switch (action.type) {
  case HYDRATE:
   let nextState = action.payload.menu; // apply delta from hydration
   return nextState
  case 'SIGNIN_SUCCESS':
   return {
    ...state,
    token: action.token,
    message: action.message
   }
  case 'AUTO_LOGIN':
   return {
    ...state,
    token: action.payload
   }

  default:
   return state;
 }
}