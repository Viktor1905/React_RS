import type { UseFormRegisterReturn } from 'react-hook-form';
import styles from '../../../styles/form.module.css';

export function SelectControlled({ register }: InputElementProps) {
  const countries = ['Russia', 'USA', 'Belarus'];

  return (
    <div className={styles.inputWrapper}>
      <legend>{'Choose your country'}:</legend>
      <select {...register}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

type InputElementProps = {
  register: UseFormRegisterReturn;
};
