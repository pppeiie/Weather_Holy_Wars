import { combineReducers } from 'redux';
import WalletReducer from './thunk-reducer';

const rootReducer = combineReducers({
  wallet: WalletReducer,
});

export default rootReducer;
