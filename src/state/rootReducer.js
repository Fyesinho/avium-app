import {combineReducers} from 'redux';
import user from './user/reducer';
import producers from './producer/reducer';
import field from './field/reducer';
import loading from './loading/reducer';
import visit from './visit/reducer';
import labor from './labor/reducer';
import quarter from './quarter/reducer';

const reducers = combineReducers({
    user,
    loading,
    producers,
    visit,
    field,
    labor,
    quarter
});

export default reducers;