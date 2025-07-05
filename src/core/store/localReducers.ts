import {combineReducers} from 'redux';
import {appAuthReducer, appFlightReducer} from './slices';

const LocalReducer = combineReducers({
  auth: appAuthReducer,
  flight: appFlightReducer,
});

export default LocalReducer;
