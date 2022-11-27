import { all } from "redux-saga/effects";
import lession from './lession';
export default function* rootSaga() {
 yield all([
  lession()
 ])
}