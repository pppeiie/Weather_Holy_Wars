import * as actions from './thunk-actions';

const initialState = {
  web3: null,
  address: '',
  balance: '',
  shortAddress: '',
  MyContractReference: null, // contract
  lastPrice: null,
  lastTime: null,
  history: [],
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        isConnect: action.isConnect,
      };
    case actions.GET_USERINFO:
      return {
        ...state,
        address: action.address,
        balance: action.balance,
        shortAddress: action.shortAddress,
      };
    case actions.INIT_CONTRACT:
      return {
        ...state,
        MyContractReference: action.MyContractReference,
      };
    case actions.UPDATE_HISTORY:
      return {
        ...state,
        history: action.history,
      };
    default:
      return state;
  }
};

export default WalletReducer;
