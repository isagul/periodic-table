import React, { useContext, useEffect } from 'react';
import { Store } from './store';
import { css } from '@emotion/core';
import PeriodicTable from './components/periodic_table/PeriodicTable';
import { PacmanLoader } from 'react-spinners';
import './App.scss';

function App() {
  const { state, dispatch } = useContext(Store);

  const override = css`
    position:absolute;
    top: 50%;
    left: 33%;
  `;

  useEffect(() => {
    const fetchElements = () => {
      fetch('https://periodic-table-10001.herokuapp.com/api/v1/elements')
      .then(response => response.json())
      .then(resp => {
        if (resp.status === "SUCCESS") {
          dispatch({
            type: 'SET_ELEMENTS',
            payload: resp.data
          })
          dispatch({
            type: 'SET_LOADING',
            payload: false
          })
        }
      });
    }
    fetchElements();
  }, [dispatch]);


  return (
    <div className="app">
      <PeriodicTable />    
      <PacmanLoader
        css={override}
        sizeUnit={"px"}
        size={20}
        color={'#36d7b7'}
        loading={state.loading}
      />  
    </div>
  );
}

export default App;
