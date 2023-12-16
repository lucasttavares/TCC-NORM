import React from 'react';
import { NormI } from '../../utils/types';

// import { Container } from './styles';

const Norm: React.FC<NormI> = ({
  _id,
  title,
  pdf,
  description,
  type,
  course,
  date,
}) => {
  return (
    <div key={_id} style={{ marginBottom: 10 }}>
      <p>Title: {title}</p>
      <p>PDF: {pdf}</p>
      <p>Description: {description}</p>
      <p>Type: {type}</p>
      <p>Course: {course}</p>
      <p>Date: {date}</p>
    </div>
  );
};

export default Norm;
