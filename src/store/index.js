import { createStore } from 'redux';
import reducer from './reducer';
import initialState from './initalState';

export {default as actionTypes} from './actionTypes';

export default createStore(reducer, initialState);