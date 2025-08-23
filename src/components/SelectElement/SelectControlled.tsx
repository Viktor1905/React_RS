import type { UseFormRegisterReturn } from 'react-hook-form';

export function SelectControlled({ register }: InputElementProps) {
  const countries = ['Russia', 'USA', 'Belarus'];

  return (
    <>
      <legend>{'Choose your country'}:</legend>
      <select {...register}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </>
  );
}

type InputElementProps = {
  register: UseFormRegisterReturn;
};
