import { all } from 'redux-saga/effects'
import {  saga as photoSaga } from '../ducks/photos'
export default function * () {
    yield all([
        photoSaga()
    ])
}