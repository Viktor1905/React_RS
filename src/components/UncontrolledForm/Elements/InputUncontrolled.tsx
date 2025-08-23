import { useRef } from 'react';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter.ts';
import { RadioUncontrolled } from './RadioUncontrolled.tsx';
import styles from '../../../styles/form.module.css';

export function InputUncontrolled({
  label,
  password,
  placeholder,
  error,
}: InputElementProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const type = password ? 'password' : inputTypes[label] || 'text';
  const gender = label === 'gender';

  if (gender) {
    return (
      <div className={styles.inputWrapper}>
        <legend>{capitalizeFirstLetter(label)}:</legend>
        <RadioUncontrolled gender={'male'} checked={true} />
        <RadioUncontrolled gender={'female'} checked={false} />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }

  return (
    <div
      className={
        type === 'checkbox' ? styles.radioWrapper : styles.inputWrapper
      }
    >
      <label htmlFor={label}>{capitalizeFirstLetter(label)}: </label>
      <input
        type={type}
        placeholder={placeholder || ''}
        id={label}
        ref={inputRef}
        name={label}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

type InputElementProps = {
  label:
    | 'name'
    | 'email'
    | 'password'
    | 'age'
    | 'password confirmation'
    | 'upload file'
    | 'gender'
    | 'accept Terms and Conditions';
  password: boolean;
  placeholder?: string;
  error?: string;
};

const inputTypes: Record<InputElementProps['label'], string> = {
  name: 'text',
  email: 'email',
  password: 'password',
  'password confirmation': 'password',
  age: 'number',
  'upload file': 'file',
  gender: 'radio',
  'accept Terms and Conditions': 'checkbox',
};

