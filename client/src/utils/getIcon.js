import React from 'react';

import {
  All,
  Running,
  Yoga,
  Tennis,
  Swim,
  Weight,
  Basketball,
} from '../assets/img';

const getIcon = (exercise, fill) => {
  switch (exercise) {
    case 'ALL':
      return <All fill={fill} />;
    case 'RUNNING':
      return <Running fill={fill} />;
    case 'YOGA':
      return <Yoga fill={fill} />;
    case 'BADMINTON':
      return <Tennis fill={fill} />;
    case 'SWIMMING':
      return <Swim fill={fill} />;
    case 'FITNESS':
      return <Weight fill={fill} />;
    case 'BASKETBALL':
      return <Basketball fill={fill} />;
    default:
      return 'none';
  }
};

export default getIcon;
