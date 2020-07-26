import React, { useState } from 'react';

import SwipeableViews from 'react-swipeable-views';

import { Tabs, Tab } from '@material-ui/core';

import { AttachMoney, List } from '@material-ui/icons';

import PricePredictionBox from '../../components/price-prediction-box/price-prediction-box.component';
import PriceChart from '../../components/price-chart/price-chart.component';
import Results from '../../components/results/results.component';

import { HomePageContainer, BetTabPanel } from './homepage.styles';

const TabPanel = ({ children, value, index, ...other }) => (
  <div role='tabpanel' hidden={value !== index} id={index} {...other}>
    {value === index && children}
  </div>
);

const HomePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <HomePageContainer>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab id='price-prediction-box' label='Bet' icon={<AttachMoney />}></Tab>
        <Tab id='price-chart' label='Result' icon={<List />}></Tab>
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={index => setValue(index)}>
        <TabPanel value={value} index={0}>
          <BetTabPanel>
            <PricePredictionBox />
            <PriceChart />
          </BetTabPanel>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Results />
        </TabPanel>
      </SwipeableViews>
    </HomePageContainer>
  );
};

export default HomePage;
