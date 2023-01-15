import { HYDRATE } from 'next-redux-wrapper';
export default function ShowLoading(state = {}, action) {
 // eslint-disable-next-line default-case
 switch (action.type) {
  case HYDRATE:
   let nextState = action.payload.showLoading; // apply delta from hydration
   return nextState
  case 'SHOW_LOADING_START':

   return {
    ...state,
    isloading: true
   }

  case 'SHOW_LOADING_END':
   let isloading = true;
   for (let i = 0; i <= 10000000; i++) {
    if (i === 10000000) {
     isloading = false
    }
   }
   if (!isloading) {
    return {
     ...state,
     isloading: false
    }

   }
  default:
   return state;
 }


}