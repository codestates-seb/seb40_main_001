import React from 'react';
import { Light } from '../../../assets/img';

const LightBtn = ({ color, changeColor, index }) => {
  return <Light onClick={() => changeColor(index)} fill={color} />;
};

export default LightBtn;
