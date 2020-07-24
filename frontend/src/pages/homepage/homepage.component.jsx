import React from 'react';

import PricePredictionBox from '../../components/price-prediction-box/price-prediction-box.component';
import PriceChart from '../../components/price-chart/price-chart.component';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
  <HomePageContainer>
    <PricePredictionBox />
    <PriceChart />
  </HomePageContainer>
);

export default HomePage;
