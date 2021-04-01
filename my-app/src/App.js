import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import data from './data.csv'
import { Table } from './components/Table'
import './App.scss';

function App() {
  const [rows, setRows] = useState([]);
  const [titles, setTitles] = useState([]);
  const [incorrectFileError, setIncorrectFileError] = useState('');

  const titlesForValidation = titles.map(title => title.toLowerCase());

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(data)
        const reader = response.body.getReader()
        const result = await reader.read()
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value)
        const results = Papa.parse(csv, { header: true })
        const rows = results.data
        setRows(rows)
        setTitles(Object.keys(rows[0]))
      } catch (error) {
        setIncorrectFileError('Incorrect file. Choose csv file')
      }
    }
    getData()
      .catch('adsfasd')
  }, [])
  return (
    <>
    {(titlesForValidation.includes('full name')
      && titlesForValidation.includes('email')
      && titlesForValidation.includes('phone'))
      ? (
      <div className="App">
        {rows.length > 0 && (
          <Table rows={rows} titles={titles} />
        )}
      </div>
    ) : incorrectFileError.length > 0 ? (
      <div className="error">{incorrectFileError}</div>
    ) : (
      <div className="error">{incorrectFileError}</div>

    )}
    </>
  );
}

export default App;
