import { FC, ReactNode } from 'react';

import './SegmentedSwitch.css';

export interface ISegmentedSwitchProps {
  children: ReactNode;
}

export const SegmentedSwitch: FC<ISegmentedSwitchProps> = ({ children }) => {
  return <div className="segmented-switch">{children}</div>;
};
