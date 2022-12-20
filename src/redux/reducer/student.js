import { HYDRATE } from 'next-redux-wrapper';
export default function Student(state = {}, action) {
 // eslint-disable-next-line default-case
 switch (action.type) {
  case HYDRATE:
   let nextState = action.payload.student; // apply delta from hydration
   return nextState
  case 'GETT_ALL_COURSE_SUCCESS':
   return {
    ...state,
    courses: action.payload
   }

  default:
   return state;
 }
}