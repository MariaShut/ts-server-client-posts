import { FC, MouseEventHandler } from 'react';

import './SegmentedSwitchOption.css';

export interface ISegmentedSwitchOptionProps {
  isActive: boolean;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SegmentedSwitchOption: FC<ISegmentedSwitchOptionProps> = ({
  isActive,
  title,
  onClick,
}) => {
  return (
    <button
      className="segmented-switch-option"
      data-active={isActive}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
