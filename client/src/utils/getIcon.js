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
    case 'all':
      return <All fill={fill} />;
    case 'running':
      return <Running fill={fill} />;
    case 'yoga':
      return <Yoga fill={fill} />;
    case 'tennis':
      return <Tennis fill={fill} />;
    case 'swim':
      return <Swim fill={fill} />;
    case 'weight':
      return <Weight fill={fill} />;
    case 'basketball':
      return <Basketball fill={fill} />;
    default:
      return 'a';
  }
};

export default getIcon;
