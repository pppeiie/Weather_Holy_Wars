import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as walletActions from './redux/thunk-actions';
import useInterval from './useInterval';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);

  useEffect(() => {
    const getAddress = () => {
      window.addEventListener('load', () => {
        dispatch(walletActions.web3Connect());
      });
    };
    getAddress();
  });

  useEffect(() => {
    dispatch(walletActions.updateHistory());
  }, [dispatch, wallet.web3]);

  useInterval(() => {
    if (wallet.web3) dispatch(walletActions.updateHistory());
  }, 360000);

  return (
    <div className='App'>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
