import React, { useContext, useEffect } from 'react';
import { Store } from './store';
import PeriodicTable from './components/periodic_table/PeriodicTable';
import RightBar from './components/right_bar/RightBar';
import './App.scss';

function App() {
  const { dispatch } = useContext(Store);

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
        }
      });
    }
    fetchElements();
  }, [dispatch]);


  return (
    <div className="app">
      <PeriodicTable />      
    </div>
  );
}

export default App;
