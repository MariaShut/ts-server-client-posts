import { FC } from 'react';

import './Loader.css';

export interface ILoaderProps {
  color?: 'blue' | 'white';
}

export const Loader: FC<ILoaderProps> = ({ color = 'blue' }) => {
  return (
    <div className="loader" data-color={color}>
      <div className="loader__segment" />
      <div className="loader__segment" />
      <div className="loader__segment" />
    </div>
  );
};
