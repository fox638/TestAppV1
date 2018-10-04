import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from './reducer'
import saga from './saga'


const sagaMiddleware = createSagaMiddleware()

const enhancer = composeWithDevTools(applyMiddleware(
    sagaMiddleware,
    logger
))

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)


export default store