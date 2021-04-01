import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import uniqueKey from 'unique-key'
import moment from 'moment';

export const Tbody = ({ rows, row, index }) => {
  const [id, setId] = useState()
  const [fullName, setFullName] = useState([]);
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const [age, setAge] = useState([]);
  const [experience, setExperience] = useState([]);
  const [yearlyInome, setYearlyInome] = useState([]);
  const [hasChildren, setHasChildren] = useState([]);
  const [licenseStates, setLicenseStates] = useState([]);
  const [expirationDate, setExpirationDate] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState([]);
  const [duplicateWith, setDuplicateWith] = useState('');

  useEffect(() => {
    setId(index + 1);
    setFullName(row['Full Name']);
    setPhone(row.Phone);
    setEmail(row.Email);
    setAge(row.Age);
    setExperience(row.Experience);
    setYearlyInome(row['Yearly Income']);
    setHasChildren(row['Has children']);
    setLicenseStates(row['License states']);
    setExpirationDate(row['Expiration date']);
    setLicenseNumber(row['License number']);
  }, [row])

  const isAdult = useCallback(
    (age) => {
      return age < 21 && age > 0
    }, [rows]
  )

  const isLawyesHaveCorrectExperience = useCallback(
    (yearsOfExperience, yearsOfAge) => {
      if (yearsOfExperience > yearsOfAge || yearsOfExperience <= 0) {
        return true
      }

      return false
    }, [],
  )

  const isCorrectYearlyIncome = useCallback(
    (counts) => {
      return counts !== Number(counts).toFixed(2) || 0 <= counts >= 1000000
    }, [],
  )

  const findAbr = useCallback(
    (string) => {
      if (string.length > 0) {
        
        let splitedBySeparator = string.split('|');
        let stringToArray = Array.of(string);
    
        if (splitedBySeparator.includes(stringToArray.toString())) {
          return string
        }

        const sortedByLength = [...splitedBySeparator].sort((curr, next) => (
          curr.length - next.length
          )
        )

        return sortedByLength[0]
      } else {
        return ''
      }
    }, [],
  )

  const correctPhoneNumber = useCallback(
    (number) => {
      return `+1${number.slice(-10)}`
    }
  )

  const isCorrectDate = useCallback(
    (date) => {
      // moment('Decimal128', 'YYYY-MM-DD').isValid();
      // const date = expirationDate;
      // const toDateFormat = moment(new Date(date)).format(dateFormat);
      const newDate = new Date(date)
      const firstDateFormat = 'MM/DD/YYYY';
      const secondDateFormat = 'YYYY-MM-DD';
      const firstIsValid = moment(date, firstDateFormat, true).isValid();
      const secondIsValid = moment(date, secondDateFormat, true).isValid();

      if ((firstIsValid && newDate > Date.now()) || (secondIsValid && newDate > Date.now())) {
        return false
      }

      return true
    }, [row],
  )

  const isChildBoolean = useCallback(
    (bool) => {
      if (bool === 'true' || bool === 'false' || bool === '') {
        return false;
      }

      return true
    }, []
  )

  const isCorrectLicenceNumber = useCallback(
    (number) => {
      return number.length !== 6
    }, []
  )

  useEffect(() => {
    let currIndex = rows.indexOf(row)
    for (let i = 0; i < rows.length; i++) {
      if ((rows[i].Email === email && i !== currIndex) || rows[i].Phone === phone && i !== currIndex) {
        setDuplicateWith(i + 1)
        break;
      }

      setDuplicateWith('')
    }
  }, [email, phone])

  return (
    <tr key={uniqueKey(1)}>
      <td key={uniqueKey(2)}>{id}</td>
      <td key={uniqueKey(3)}>{fullName}</td>
      <td key={uniqueKey(4)}>{correctPhoneNumber(phone)}</td>
      <td key={uniqueKey(5)}>{email}</td>
      <td className={isAdult(age) ? "incorrect-data" : ''} key={uniqueKey(6)}>{age}</td>
      <td className={isLawyesHaveCorrectExperience(experience, age) ? "incorrect-data" : ''} key={uniqueKey(7)}>{experience}</td>
      <td className={isCorrectYearlyIncome(yearlyInome) ? "incorrect-data" : ''} key={uniqueKey(8)}>{yearlyInome}</td>
      <td className={isChildBoolean(hasChildren) ? "incorrect-data" : ''} key={uniqueKey(9)}>{hasChildren === '' ? 'false' : hasChildren}</td>
      <td key={uniqueKey('04')}>{findAbr(licenseStates)}</td>
      <td className={isCorrectDate(expirationDate) ? "incorrect-data" : ''} key={uniqueKey('02')}>{expirationDate}</td>
      <td className={isCorrectLicenceNumber(licenseNumber) ? "incorrect-data" : ''} key={uniqueKey('03')}>{licenseNumber}</td>
      <td key={uniqueKey('05')}>{duplicateWith}</td>
    </tr>
  )
}

Tbody.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      'Full Name': PropTypes.string,
      Phone: PropTypes.string,
      Email: PropTypes.string,
      Age: PropTypes.string,
      Experience: PropTypes.string,
      'Yearly Income': PropTypes.string,
      'Has children': PropTypes.string,
      'License states': PropTypes.string,
      'Expiration date': PropTypes.string,
      'License number': PropTypes.string,
    })
  ),
  row: PropTypes.shape({
    'Full Name': PropTypes.string,
    Phone: PropTypes.string,
    Email: PropTypes.string,
    Age: PropTypes.string,
    Experience: PropTypes.string,
    'Yearly Income': PropTypes.string,
    'Has children': PropTypes.string,
    'License states': PropTypes.string,
    'Expiration date': PropTypes.string,
    'License number': PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
}