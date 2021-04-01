import React from 'react';
import PropTypes from 'prop-types';

export const Thead = ({ titles }) => {

  return (
    <thead>
      <tr>
        <th>id</th>
        {titles.map(title => (
          <th key={new Date(1000) + title}>{title}</th>
        ))}
        <th>Duplicate With</th>
      </tr>
    </thead>
  )
}

Thead.propTypes = {
  titles: PropTypes.array.isRequired,
}