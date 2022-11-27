import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import rootReducer from './reducer';
const initialState = {
  user: {
    user: {},
    email: "",
    token: "",
    firstName: "",
    lastName: "",
    message: "",
    loading: false,
    message1: "",
    success: false,
    updateSuccess: false,
    error: false,
    messageUpdate: ""
  },
  lessions: [],
  menu: {
    isOpenMenu: true,
  },
  lession: {
    nameLession: "",
    majors: "0",
    image: "",
    description: "",
    startDate: "",
    endDate: "",
    document: [],
    program: [],
    examAndTest: []
  }
}
const store = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      )
      : applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default store;