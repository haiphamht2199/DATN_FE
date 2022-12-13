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
    messageUpdate: "",
    isTeacher: ""
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
  },
  _class: {
    class_id: "",
    nameClass: "",
    moduleClassId: 1,
    description: "",
    dateTimeStart: "",
    dateTimeEnd: "",
    pathFileImage: "",
    scope: 0,
    documentList: [],
    exam: [],
    listStudent: [],
    editStudent: "",
    listClass: [],
    arrayProgram: [],
    editLesson: "",
    classDetail: {
      class_id: "",
      name_class: "",
      tag_class: "",
      scope_class: 0,
      total_students: 0,
      status_class: 1,
      start_time: null,
      end_time: null,
      path_file_image: ""
    }
  },

  modal: {
    editStudent: false
  },
  moduleClass: {
    modules: {}
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