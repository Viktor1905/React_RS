import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { effectFunction } from '../../utils/useEffectFunction.ts';
import { InputControlled } from './Elements/InputControlled.tsx';
import { SelectControlled } from './Elements/SelectControlled.tsx';
import styles from '../../styles/form.module.css';

export function ControlledForm({
  closeWindow,
  whichOpen,
}: ControlledFormProps) {
  const { register, handleSubmit } = useForm();
  const modalRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  useEffect(
    () => effectFunction('controlled', modalRef, closeWindow, whichOpen),
    [whichOpen, closeWindow]
  );
  return (
    <form
      onSubmit={handleSubmit(closeWindow)}
      ref={modalRef}
      className={styles.form}
    >
      <legend>Controlled form</legend>
      <InputControlled
        label={'name'}
        password={false}
        placeholder={'Adam'}
        register={register('name')}
      />
      <InputControlled
        label={'age'}
        password={false}
        placeholder={'20'}
        register={register('age')}
      />
      <InputControlled
        label={'email'}
        password={false}
        placeholder={'email@example.com'}
        register={register('email')}
      />
      <InputControlled
        label={'password'}
        password={false}
        placeholder={'1Ws!'}
        register={register('password')}
      />
      <InputControlled
        label={'password confirmation'}
        password={false}
        placeholder={'1Ws!'}
        register={register('password confirmation')}
      />
      <InputControlled
        label={'gender'}
        password={false}
        register={register('gender')}
      />
      <InputControlled
        label={'accept Terms and Conditions'}
        password={false}
        placeholder={'1Ws!'}
        register={register('accept Terms and Conditions')}
      />
      <InputControlled
        label={'upload file'}
        password={false}
        placeholder={'1Ws!'}
        register={register('upload file')}
      />
      <SelectControlled register={register('country')} />
      <button type="submit" ref={submitRef} className={styles.submit}>
        Close
      </button>
    </form>
  );
}

type ControlledFormProps = {
  closeWindow: () => void;
  whichOpen: string;
};
