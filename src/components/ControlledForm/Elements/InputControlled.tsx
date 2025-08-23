import type { UseFormRegisterReturn } from 'react-hook-form';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter.ts';
import styles from '../../../styles/form.module.css';
export function InputControlled({
  label,
  register,
  password,
  placeholder,
}: InputElementProps) {
  const type = password ? 'password' : inputTypes[label] || 'text';
  const gender = label === 'gender';
  if (gender) {
    return (
      <div className={styles.inputWrapper}>
        <legend>{capitalizeFirstLetter(label)}:</legend>
        <div className={styles.radioWrapper}>
          <label htmlFor={'Male'}>Male:</label>
          <input {...register} type={type} id={'Male'} value={'male'} />
        </div>
        <div className={styles.radioWrapper}>
          <label htmlFor={'Female'}>Female: </label>
          <input {...register} type={type} id={'Female'} value={'Female'} />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={label}>{capitalizeFirstLetter(label)}: </label>
      <input {...register} type={type} placeholder={placeholder || ''} />
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
  register: UseFormRegisterReturn;
  errorMessage?: string;
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
