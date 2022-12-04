import { all } from "redux-saga/effects";
import lession from './lession';
import user from './user';
export default function* rootSaga() {
 yield all([
  lession(),
  user()
 ])
}