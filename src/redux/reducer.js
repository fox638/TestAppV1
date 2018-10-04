import { combineReducers } from 'redux'
import photoReducer, {moduleName as photoModule} from '../ducks/photos'


export default combineReducers({
    [photoModule]:photoReducer
})