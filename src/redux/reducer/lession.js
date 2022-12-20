import { HYDRATE } from 'next-redux-wrapper';
export default function Lession(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case HYDRATE:
      let nextState = action.payload.lession; // apply delta from hydration
      return nextState

    case 'ADD_NEW_CONTENT_LESSION':

      let programs = action.programs;
      let x = Math.random() * 100;
      let newLession = {
        id: x,
        name: action.nameLession,
        key: "lession"
      }
      programs.push(newLession);
      return {
        ...state,
        program: programs
      }
    case 'ADD_NEW_ACTIVE_LESSION':

      let programs1 = action.programs;
      let x1 = Math.random() * 100;
      let newActive = {
        id: x1,
        name: action.nameActive,
        key: "active"
      }
      programs1.push(newActive);
      return {
        ...state,
        program: programs1
      }

    default:
      return state;
  }
}