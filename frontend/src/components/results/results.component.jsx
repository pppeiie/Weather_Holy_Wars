import React, { useState, useEffect } from 'react';

import MUIDataTable from 'mui-datatables';

import { TableRow, TableCell } from '@material-ui/core';

import CountdownTimer from '../countdown-timer/countdown-timer.component';
import ResultAnnouncement from '../result-announcement/result-announcement.component';
import ReadyAnnouncement from '../ready-announcement/ready-announcement.component';

import WinningIllustration from '../../assets/illustrations/make-it-rain.svg';
import LosingIllustration from '../../assets/illustrations/bankruptcy.svg';

import { ResultsContainer } from './results.styles';

const Results = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      name: 'startedAt',
      label: 'Started at',
      options: {
        filter: true
      }
    },
    {
      name: 'stake',
      label: 'Stake (ETH)',
      options: {
        filter: true
      }
    },
    {
      name: 'bettedTimePrice',
      label: 'Price at bet time ($)',
      options: {
        filter: true
      }
    },
    {
      name: 'prediction',
      label: 'Prediction',
      options: {
        filter: false
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true
      }
    },
    {
      name: 'result',
      label: 'Result',
      options: {
        filter: true
      }
    }
  ];

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    tableBodyHeight: '400px',
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    expandableRows: true,
    expandableRowsHeader: true,
    expandableRowsOnClick: true,
    renderExpandableRow: rowData => {
      const [startedTime, , , , status, result] = rowData;

      const remainingTime = Date.now() - new Date(startedTime);

      const getRowExpansion = () => {
        if (status.toLowerCase() === 'pending')
          return (
            <CountdownTimer
              remainingTime={remainingTime < 3600000 ? remainingTime : 0}
            />
          );

        if (status.toLowerCase() === 'ready') return <ReadyAnnouncement />;

        if (status.toLowerCase() === 'done') {
          if (result.toLowerCase() === 'win')
            return (
              <ResultAnnouncement
                type='win'
                title='Congratulations, prophet !'
                description='You had an outstanding move in this bet. Reward will be sent to fill
                  your wallet immediately.'
                illustration={WinningIllustration}
              />
            );

          if (result.toLowerCase() === 'lose')
            return (
              <ResultAnnouncement
                type='lose'
                title='What a pity !'
                description='You were unlucky this time. The stake has lost but keep trying hard and you will smile again very soon.'
                illustration={LosingIllustration}
              />
            );
        }
      };

      return (
        <TableRow>
          <TableCell colSpan={rowData.length + 1}>
            {getRowExpansion()}
          </TableCell>
        </TableRow>
      );
    },
    jumpToPage: true,
    downloadOptions: {
      filename: 'bet-results.csv'
    }
  };

  useEffect(() => {
    const sampleDate = new Date(Date.now() - 15000);

    const sampleData = [
      {
        startedAt: sampleDate.toLocaleString(),
        stake: 0.1,
        bettedTimePrice: 9320.1,
        prediction: 'Go down',
        status: 'Pending',
        result: 'Pending'
      },
      {
        startedAt: '7/26/2020, 12:30:00 AM',
        stake: 0.15,
        bettedTimePrice: 9290.6,
        prediction: 'Go up',
        status: 'Ready',
        result: 'Pending'
      },
      {
        startedAt: '7/26/2020, 7:30:00 AM',
        stake: 0.25,
        bettedTimePrice: 9472.6,
        prediction: 'Go down',
        status: 'Done',
        result: 'Lose'
      },
      {
        startedAt: '7/25/2020, 9:30:00 PM',
        stake: 0.5,
        bettedTimePrice: 9535.7,
        prediction: 'Go up',
        status: 'Done',
        result: 'Win'
      }
    ];

    setData(sampleData);
  }, []);

  return (
    <ResultsContainer>
      <MUIDataTable
        title='Bet Results'
        columns={columns}
        options={options}
        data={data}
      />
    </ResultsContainer>
  );
};

export default Results;
