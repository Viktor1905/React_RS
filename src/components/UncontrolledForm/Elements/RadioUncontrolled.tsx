import styles from '../../../styles/form.module.css';

export function RadioUncontrolled({ gender }: InputElementProps) {
  return (
    <div className={styles.radioWrapper}>
      <label htmlFor={gender}>{gender}</label>
      <input type={'radio'} id={gender} name="gender" value={gender} />
    </div>
  );
}

type InputElementProps = {
  gender: 'male' | 'female';
  checked: boolean;
};
