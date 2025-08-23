import { useEffect, useRef } from 'react';
import { effectFunction } from '../../utils/useEffectFunction.ts';
import { InputUncontrolled } from './Elements/InputUncontrolled.tsx';
import { SelectUncontrolled } from './Elements/SelectUncontrolled.tsx';
import styles from '../../styles/form.module.css';

export function UncontrolledForm({
  closeWindow,
  whichOpen,
}: UncontrolledFormProps) {
  const modalRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  useEffect(
    () => effectFunction('uncontrolled', modalRef, closeWindow, whichOpen),
    [whichOpen, closeWindow]
  );
  return (
    <form onSubmit={closeWindow} ref={modalRef} className={styles.form}>
      <legend>Uncontrolled form</legend>
      <InputUncontrolled label={'name'} password={false} placeholder={'Adam'} />
      <InputUncontrolled label={'age'} password={false} placeholder={'20'} />
      <InputUncontrolled
        label={'email'}
        password={false}
        placeholder={'email@example.com'}
      />
      <InputUncontrolled
        label={'password'}
        password={false}
        placeholder={'1Ws!'}
      />
      <InputUncontrolled
        label={'password confirmation'}
        password={false}
        placeholder={'1Ws!'}
      />
      <InputUncontrolled label={'gender'} password={false} />
      <InputUncontrolled
        label={'accept Terms and Conditions'}
        password={false}
        placeholder={'1Ws!'}
      />
      <InputUncontrolled
        label={'upload file'}
        password={false}
        placeholder={'1Ws!'}
      />
      <SelectUncontrolled />
      <button type="submit" ref={submitRef} className={styles.submit}>
        Close
      </button>
    </form>
  );
}

type UncontrolledFormProps = {
  closeWindow: () => void;
  whichOpen: string;
};
