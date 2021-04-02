import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Table } from './components/Table'
import './App.scss';

function App() {
  const [titles, setTitles] = useState([]);
  const [rows, setRows] = useState([]);
  const titlesForValidation = titles.map(title => title.toLowerCase());

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {

      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

      if (headers && row.length == headers.length) {
        const newObj = {};
        for (let j = 0; j < headers.length; j++) {
          let td = row[j];
          if (td.length > 0) {
            if (td[0] == '"')
              td = td.substring(1, td.length - 1);
            if (td[td.length - 1] == '"')
              td = td.substring(td.length - 2, 1);
          }
          if (headers[j]) {
            newObj[headers[j]] = td;
          }
        }
 
        if (Object.values(newObj).filter(x => x).length > 0) {
          list.push(newObj);
        }
      }
    }
 
    setRows(list);
    setTitles(headers);
  }
 
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };

    reader.readAsBinaryString(file);
  }

  return (
    <>
    <input
        className="file-input"
        id="file"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <label htmlFor="file">Choose File</label>
      {rows.length < 1 ? (
        ''
      ) :
      (titlesForValidation.includes('full name')
      && titlesForValidation.includes('email')
      && titlesForValidation.includes('phone'))
      ? (
        <Table
        titles={titles}
        rows={rows}
        />
      ) : (<div className="error">Wrong data</div>)
      }
    </>
  );
}

export default App;
