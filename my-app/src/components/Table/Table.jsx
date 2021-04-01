import React from 'react';
import PropTypes from 'prop-types'
import { Thead } from '../Thead/Thead';
import { Tbody } from '../Tbody/Tbody';

export const Table = ({ rows, titles }) => {

  return (
    <table>
      <Thead titles={titles} />
      <tbody>
        {rows.map((row, index) => (
          <Tbody key={new Date(5000) + index} rows={rows} row={row} index={index} />
        ))}
      </tbody>
    </table>
  )
}


Table.propTypes = {
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
    }),
  ).isRequired,
  titles: PropTypes.array,
}
  // const [fullName, setFullName] = useState([]);
  // const [phone, setPhone] = useState([]);
  // const [email, setEmail] = useState([]);
  // const [age, setAge] = useState([]);
  // const [expirience, setExpirience] = useState([]);
  // const [yearlyInome, setYearlyInome] = useState([]);
  // const [licenseStates, setLicenseStates] = useState([]);
  // const [expirationDate, setExpirationDate] = useState([]);
  // const [licenseNumber, setLicenseNumber] = useState([]);
    // useEffect(() => {
    //   rows.map(row => (
    //     setFullName(row['Full Name'])
    //   ))
    // })