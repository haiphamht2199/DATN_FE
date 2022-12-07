import { HYDRATE } from 'next-redux-wrapper';
export default function ModuleClass(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case HYDRATE:
      let nextState = action.payload.moduleClass; // apply delta from hydration
      return nextState
    case 'GET_ALL_MODULES_SUCCESS':
      console.log("state:", state.modules)
      console.log("action:", typeof (action.payload))
      return {
        ...state,
        modules: action.payload
      }
    default:
      return state;
  }
}