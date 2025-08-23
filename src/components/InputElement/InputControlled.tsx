import type { UseFormRegisterReturn } from 'react-hook-form';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.ts';

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
      <>
        <legend>{capitalizeFirstLetter(label)}:</legend>
        <div>
          <input {...register} type={type} id={'Male'} value={'male'} />
          <label htmlFor={'Male'}>Male</label>
        </div>
        <div>
          <input {...register} type={type} id={'Female'} value={'Female'} />
          <label htmlFor={'Female'}>Female</label>
        </div>
      </>
    );
  }
  return (
    <>
      <label htmlFor={label}>{capitalizeFirstLetter(label)}: </label>
      <input {...register} type={type} placeholder={placeholder || ''} />
    </>
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
