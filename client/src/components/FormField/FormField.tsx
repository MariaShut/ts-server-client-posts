import { FC, ReactNode } from 'react';

import './FormField.css';

export interface IFormFieldProps {
  label: string;
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  label,
  children,
  errorMessage,
}) => {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>

      {children}

      {errorMessage && (
        <span className="form-field__error">{errorMessage}</span>
      )}
    </label>
  );
};
