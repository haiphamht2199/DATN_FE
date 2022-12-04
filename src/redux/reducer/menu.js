import { HYDRATE } from 'next-redux-wrapper';
export default function Lession(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case HYDRATE:
      let nextState = action.payload.menu; // apply delta from hydration
      return nextState
    case 'CHANGE_OPEN_MENU':
      return {
        ...state,
        isOpenMenu: !action.isOpen
      }

    default:
      return state;
  }
}