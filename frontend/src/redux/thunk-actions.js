import Web3 from 'web3';
// import * as contractAction from 'actions/contractAction';

export const WEB3_CONNECT = 'WEB3_CONNECT';
export const web3Connect = () => async (dispatch) => {
  var web3;
  try {
    if (window.web3) {
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
        } catch (error) {
          console.error(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        web3 = window.web3;
        console.log('Injected web3 detected.');
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
        web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
      }

      console.log(web3)
      dispatch({
        type: WEB3_CONNECT,
        web3,
      });
      dispatch(getProfile());
      // dispatch(contractAction.initContract());
    }
  } catch (error) {
    alert(`Failed to load web3, accounts, or contract. Check console for details.`);
    console.error(error);
  }
};

export const GET_USERINFO = 'GET_USERINFO';
export const getProfile = () => async (dispatch, getState) => {
  const state = getState();
  let web3 = state.wallet.web3;
  if (web3) {
    const account = await web3.eth.getAccounts();
    if (account.length > 0) {
      const address = account[0];
      var balance = await web3.eth.getBalance(address);
      balance = web3.utils.fromWei(balance);

      if (balance.includes('.')) {
        let interger = balance.split('.', 2)[0];
        let fractional = balance.split('.', 2)[1].substr(0, 4);
        balance = interger.concat('.', fractional, ' ');
      }

      const shortAddress = address.slice(0, 5) + '...' + address.slice(address.length - 4);
      dispatch({
        type: GET_USERINFO,
        address,
        balance,
        shortAddress,
      });
    } else {
      console.log('Account not found');
    }
  }
};
