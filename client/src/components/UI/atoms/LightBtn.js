import React, { useState } from 'react';
import { ReactComponent as Light } from '../../../assets/img/icons/light.svg';

const LightBtn = ({ props }) => {
  const [color, setColor] = useState('white');

  const changeColor = () => {
    if (color === props) {
      setColor('white');
    } else {
      setColor(props);
    }
  };

  return <Light onClick={changeColor} fill={color} />;
};

export default LightBtn;
