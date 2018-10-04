import {appName} from '../config'
import { OrderedMap, Record } from 'immutable'
import {all, takeEvery, call, put} from 'redux-saga/effects'
import {createSelector} from 'reselect'
import {getPhoto, DataToEntities} from './utils'

const ReducerState = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false,
    loadPage: 0,
})


const PhotoRecord = Record({
    id:null,
    smallImageLink:null,
    fullImageLink: null,
    title:null,
    userName:null,
})

export const moduleName = 'photos'

const prefix = `${appName}/${moduleName}`

export const LOAD_PHOTO_RQUEST = `${prefix}/LOAD_PHOTO_RQUEST`
export const LOAD_PHOTO_SUCCESS = `${prefix}/LOAD_PHOTO_SUCCESS`
export const LOAD_PHOTO_ERROR = `${prefix}/LOAD_PHOTO_ERROR`


export default function reducer(state = new ReducerState(), action){
    const {type, payload} = action

    switch(type){

        case LOAD_PHOTO_RQUEST:
            return state.set('loading', true)


        case LOAD_PHOTO_SUCCESS:
            return state
                    .set('loading', false)
                    .set('loaded', true)
                    .set('loadPage', payload.page)
                    .mergeIn(['entities'], DataToEntities(payload.photos, PhotoRecord))
                    

        default:
            return state
    }
}

/**
 * Selectors
 */

export const stateSelector = state => state[moduleName]
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const loadedSelector = createSelector(stateSelector, state => state.loaded)
export const pageLoadSelector = createSelector(stateSelector, state => state.loadPage)
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const photoListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())

export function loadPhoto(query){
    
    return {
        type: LOAD_PHOTO_RQUEST,
        payload:{
            ...query
        }
    }
}

export const loadPhotoSaga = function * ({payload}) {
    
    try {
        const photos = yield call(getPhoto, payload)
        yield put({
            type: LOAD_PHOTO_SUCCESS,
            payload:{
                photos,
                page:payload.page ? payload.page : 1
            }
        })
    }catch (error) {
        yield put({
            type: LOAD_PHOTO_ERROR,
            error
        })
    }
    
}








export const saga = function * () {
    yield all([
        takeEvery(LOAD_PHOTO_RQUEST, loadPhotoSaga)
    ])
}