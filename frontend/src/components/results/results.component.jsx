import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import accounting from 'accounting';

import * as walletActions from '../../redux/thunk-actions';

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

  const dispatch = useDispatch();

  const wallet = useSelector(state => state.wallet);

  const columns = [
    {
      name: 'timeStart',
      label: 'Started at',
      options: {
        filter: true,
        customBodyRender: value => new Date(value * 1000).toLocaleString()
      }
    },
    {
      name: 'amount',
      label: 'Stake (ETH)',
      options: {
        filter: true,
        customBodyRender: value => parseFloat(value.slice(0, value.length - 14)) / 10000
      }
    },
    {
      name: 'lastPrice',
      label: 'Price at bet time',
      options: {
        filter: true,
        customBodyRender: value => accounting.formatMoney(value.slice(0, value.length - 8))
      }
    },
    {
      name: 'choice',
      label: 'Prediction',
      options: {
        filter: false,
        customBodyRender: value => {
          switch (value) {
            case '0':
              return 'Go up';

            case '1':
              return 'Unchanged';

            case '2':
              return 'Go down';

            default:
              return null;
          }
        }
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        customBodyRender: value => (value === '0' ? 'Pending' : value === '1' ? 'Done' : null)
      }
    },
    {
      name: 'isWin',
      label: 'Result',
      options: {
        filter: true,
        customBodyRender: value => {
          switch (value) {
            case '-1':
              return 'Pending';

            case '0':
              return 'Lost';

            case '1':
              return 'Winned';

            default:
              return null;
          }
        }
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
    renderExpandableRow: (rowData, rowMeta) => {
      const [startedAt, , , , status, result] = rowData;

      const remainingTime = new Date(startedAt).getTime() + 3600000 - Date.now();

      const getRowExpansion = () => {
        if (status.toLowerCase() === 'pending')
          return remainingTime > 0 ? (
            <CountdownTimer remainingTime={remainingTime} transactionIndex={rowMeta.dataIndex} />
          ) : (
            <ReadyAnnouncement transactionIndex={rowMeta.dataIndex} />
          );

        if (status.toLowerCase() === 'done') {
          if (result.toLowerCase() === 'winned')
            return (
              <ResultAnnouncement
                type='winned'
                title='Congratulations, prophet !'
                description='You had an outstanding move in this bet. Reward will be sent to fill
                  your wallet immediately.'
                illustration={WinningIllustration}
              />
            );

          if (result.toLowerCase() === 'lost')
            return (
              <ResultAnnouncement
                type='lost'
                title='What a pity !'
                description='You were unlucky this time. The stake has lost but keep trying hard and you will smile again very soon.'
                illustration={LosingIllustration}
              />
            );
        }
      };

      return (
        <TableRow>
          <TableCell colSpan={rowData.length + 1}>{getRowExpansion()}</TableCell>
        </TableRow>
      );
    },
    jumpToPage: true,
    downloadOptions: {
      filename: 'bet-results.csv'
    }
  };

  useEffect(() => {
    dispatch(walletActions.getAllBetOfPlayer());
  }, [dispatch]);

  useEffect(() => {
    const { allBets } = wallet;

    setData(allBets.map(bet => Object.assign({}, bet)));
  }, [wallet]);

  return (
    <ResultsContainer>
      <MUIDataTable title='Bet Results' columns={columns} options={options} data={data} />
    </ResultsContainer>
  );
};

export default Results;
