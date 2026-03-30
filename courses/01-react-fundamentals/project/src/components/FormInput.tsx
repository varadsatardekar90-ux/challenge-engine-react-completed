import React from 'react';

interface FormInputProps {
  label?: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
  type?: 'text' | 'date' | 'email' | 'password';
  placeholder?: string;
  error?: string;
}

function FormInput({ label, id, value, onChange, type = 'text', placeholder, error }: FormInputProps) {
  return (
    <div className="form-input">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

export default FormInput;