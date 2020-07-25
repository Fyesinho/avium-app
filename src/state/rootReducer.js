import {combineReducers} from 'redux';
import user from './user/reducer';
import producers from './producer/reducer';
import loading from './loading/reducer';
import visit from './visit/reducer';

const reducers = combineReducers({
    user,
    loading,
    producers,
    visit
});

export default reducers;