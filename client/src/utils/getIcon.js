import React from 'react';

import { ReactComponent as All } from '../assets/img/icons/all.svg';
import { ReactComponent as Running } from '../assets/img/icons/running.svg';
import { ReactComponent as Yoga } from '../assets/img/icons/yoga.svg';
import { ReactComponent as Tennis } from '../assets/img/icons/tennis.svg';
import { ReactComponent as Swim } from '../assets/img/icons/swim.svg';
import { ReactComponent as Weight } from '../assets/img/icons/weight.svg';
import { ReactComponent as Basketball } from '../assets/img/icons/basketball.svg';

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
