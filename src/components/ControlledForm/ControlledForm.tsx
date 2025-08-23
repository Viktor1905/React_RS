import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { effectFunction } from '../../utils/useEffectFunction.ts';
import { InputControlled } from './Elements/InputControlled.tsx';
import { SelectControlled } from './Elements/SelectControlled.tsx';
import styles from '../../styles/form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  fullSchema,
  type FullSchemaData,
} from '../../utils/schema/baseSchema.ts';

export function ControlledForm({
  closeWindow,
  whichOpen,
}: ControlledFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullSchemaData>({
    mode: 'onChange',
    resolver: zodResolver(fullSchema),
  });
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
        errorMessage={errors.name?.message}
      />
      <InputControlled
        label={'age'}
        password={false}
        placeholder={'20'}
        register={register('age')}
        errorMessage={errors.age?.message}
      />
      <InputControlled
        label={'email'}
        password={false}
        placeholder={'email@example.com'}
        register={register('email')}
        errorMessage={errors.email?.message}
      />
      <InputControlled
        label={'password'}
        password={false}
        placeholder={'1Ws!'}
        register={register('password')}
        errorMessage={errors.password?.message}
      />
      <InputControlled
        label={'password confirmation'}
        password={false}
        placeholder={'1Ws!'}
        register={register('password confirmation')}
        errorMessage={errors['password confirmation']?.message}
      />
      <InputControlled
        label={'gender'}
        password={false}
        register={register('gender')}
        errorMessage={errors.gender?.message}
      />
      <InputControlled
        label={'accept Terms and Conditions'}
        password={false}
        register={register('accept Terms and Conditions')}
        errorMessage={errors['accept Terms and Conditions']?.message}
      />
      <InputControlled
        label={'upload file'}
        password={false}
        register={register('upload file')}
        errorMessage={
          typeof errors['upload file']?.message === 'string'
            ? errors['upload file']?.message
            : undefined
        }
      />
      <SelectControlled register={register('country')} />
      <button type="submit" ref={submitRef} className={styles.submit}>
        Submit
      </button>
    </form>
  );
}
type ControlledFormProps = {
  closeWindow: () => void;
  whichOpen: string;
};
