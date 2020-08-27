import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import "./App.css";

function ChartPanel(props) {

  const [title, setTitle] = useState('Average Rainfall per month');
  const [label, setLabel] = useState('Rainfall');
  const [gLabels, setGLabels] = useState(['January', 'February', 'March', 'April', 'May']);
  const [gData, setGData] = useState([65, 59, 80, 81, 56]);

  function showRainfall(e) {
    setTitle('Average Rainfall per month');
    setLabel('Rainfall');
    setGLabels(['January', 'February', 'March', 'April', 'May']);
    setGData([65, 59, 80, 81, 56]);
  }

  function showIBMStock(e) {
    e.preventDefault();
    fetchAsync()
      .then(data => {
        let l = [];
        let d = [];
        const obj = data['Weekly Time Series'];
        for (let k of Object.keys(obj)) {
          l.push(k);
          d.push(obj[k]['4. close'])
        }
        const ratio = Math.ceil(d.length / window.innerWidth) * 5
        setGLabels(optimizeDataArrayLength(l, ratio).reverse());
        setGData(optimizeDataArrayLength(d, ratio).reverse());
        setTitle('Weekly IBM stock time series ');
        setLabel('Close price');
      })
      .catch(reason => console.log(reason.message));
  };

  function optimizeDataArrayLength(array, ratio) {

    let newArr = [];
    for (let index = 0; index < array.length; index = index + ratio) {
      console.log(index)
      newArr.push(array[index]);
    }
    console.log(newArr);
    return newArr;
  }

  async function fetchAsync() {
    // await response of fetch call
    let response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo');
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
  }

  const state = {
    labels: gLabels,
    datasets: [
      {
        label: label,
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: gData
      }
    ]
  }

  return (
    <div className="flex-container-column">
      <div>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: title,
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
      <div>
        <input type="button" value="IBM stock" tooltip="DES" className="button" onClick={(e) => showIBMStock(e)}></input>
        <input type="button" value="Rainfall" tooltip="DES" className="button" onClick={(e) => showRainfall(e)}></input>
      </div>
    </div>
  );
}

export default ChartPanel;
