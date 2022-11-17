import React from 'react';
import { ReactComponent as Light } from '../../../assets/img/icons/light.svg';

const LightBtn = ({ color, changeColor, index }) => {
  return <Light onClick={() => changeColor(index)} fill={color} />;
};

export default LightBtn;
