import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as walletActions from './redux/thunk-actions';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAddress = () => {
      window.addEventListener('load', () => {
        dispatch(walletActions.web3Connect());
      });
    };
    getAddress();
  });

  return (
    <div className='App'>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
