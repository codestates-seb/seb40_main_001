import React from 'react';
import { ReactComponent as All } from '../../../assets/img/icons/all.svg';
import { ReactComponent as Running } from '../../../assets/img/icons/running.svg';
import { ReactComponent as Yoga } from '../../../assets/img/icons/yoga.svg';
import { ReactComponent as Tennis } from '../../../assets/img/icons/tennis.svg';
import { ReactComponent as Swim } from '../../../assets/img/icons/swim.svg';
import { ReactComponent as Weight } from '../../../assets/img/icons/weight.svg';
import { ReactComponent as Basketball } from '../../../assets/img/icons/basketball.svg';

const ExerciseBtn = ({ exercise, handleClick }) => {
  const getIcon = () => {
    switch (exercise) {
      case 'all':
        return <All />;
      case 'runnung':
        return <Running />;
      case 'yoga':
        return <Yoga />;
      case 'tennis':
        return <Tennis />;
      case 'swim':
        return <Swim />;
      case 'weight':
        return <Weight />;
      case 'basketball':
        return <Basketball />;
      default:
        return 'a';
    }
  };

  const icon = getIcon();

  return (
    <button
      onClick={handleClick}
      className="w-[55px] h-[55px] btn btn-circle hover:bg-main bg-main-week"
    >
      <div>{icon}</div>
    </button>
  );
};

export default ExerciseBtn;
