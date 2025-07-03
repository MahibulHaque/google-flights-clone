import {combineReducers} from 'redux';
import {appAuthReducer} from './slices';

const LocalReducer = combineReducers({
  auth: appAuthReducer,
});

export default LocalReducer;
