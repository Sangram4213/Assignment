import { useEffect, useState } from 'react';
import Papa from "papaparse";
import CSVData from './data/Electric_Vehicle_Population_Data.csv';
import './App.css';
import DataVisualization from './components/DataVisualization';
import Loader from './components/Loader';

function App() {
  const [csvData, setCsvData] = useState([]);
  const chunkSize = 100;
  const [processingChunks, setProcessingChunks] = useState(false);

  useEffect(() => {
    getCSVData();
  }, []);

  const getCSVData = () => {
    setProcessingChunks(true);
    let chunkBuffer = [];
    Papa.parse(CSVData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      download: true,
      step: function (row) {
        chunkBuffer.push(row?.data);

        if (chunkBuffer.length === chunkSize) {
          processChunks(chunkBuffer);
          chunkBuffer = [];
        }
      },
      complete: function (results) {
        if (chunkBuffer.length > 0) {
          processChunks(chunkBuffer);
        }
        setProcessingChunks(false);
      }
    });
  };

  const processChunks = (chunk) => {
    setCsvData(prev => [...prev, ...chunk]);
  };

  return (
    <div className="App">
      {processingChunks ? (
        <Loader />
      ) : (
        <DataVisualization data={csvData} />
      )}
    </div>
  );
}

export default App;
