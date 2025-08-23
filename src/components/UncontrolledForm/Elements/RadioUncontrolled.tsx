import styles from '../../../styles/form.module.css';

export function RadioUncontrolled({ gender, checked }: InputElementProps) {
  return (
    <div className={styles.radioWrapper}>
      <label htmlFor={gender}>{gender}</label>
      <input type={'radio'} id={gender} value={gender} name="gender" checked={checked} />
    </div>
  );
}

type InputElementProps = {
  gender: 'male' | 'female';
  checked: boolean;
};
