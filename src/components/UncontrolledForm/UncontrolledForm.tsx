import { type FormEvent, useEffect, useRef, useState } from 'react';
import { effectFunction } from '../../utils/useEffectFunction.ts';
import { InputUncontrolled } from './Elements/InputUncontrolled.tsx';
import { SelectUncontrolled } from './Elements/SelectUncontrolled.tsx';
import styles from '../../styles/form.module.css';
import { fullSchema } from '../../utils/schema/baseSchema.ts';
import { z, ZodError } from 'zod';

export function UncontrolledForm({
  closeWindow,
  whichOpen,
}: UncontrolledFormProps) {
  const modalRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  useEffect(
    () => effectFunction('uncontrolled', modalRef, closeWindow, whichOpen),
    [whichOpen, closeWindow]
  );
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data['password confirmation']);
    console.log(data['country']);
    const normalized = {
      ...data,
      gender: data.gender || '',
      age: data.age, //
      'accept Terms and Conditions':
        data['accept Terms and Conditions'] === 'on',
      'upload file': formData.getAll('upload file'),
    };

    try {
      const validatedData = fullSchema.parse(normalized);
      closeWindow();
      return { success: true, data: validatedData };
    } catch (error) {
      if (!(error instanceof ZodError)) {
        console.log('Something went wrong', error);
        return false;
      }
      const errors = getFieldErrors(error);
      console.log(errors);
      setFieldErrors({});
      setFieldErrors(errors);
      return { success: false, errors: error.issues };
    }
  }
  return (
    <form onSubmit={submit} ref={modalRef} className={styles.form}>
      <legend>Uncontrolled form</legend>
      <InputUncontrolled
        label={'name'}
        password={false}
        placeholder={'Adam'}
        error={fieldErrors['name']}
      />
      <InputUncontrolled
        label={'age'}
        password={false}
        placeholder={'20'}
        error={fieldErrors['age']}
      />
      <InputUncontrolled
        label={'email'}
        password={false}
        placeholder={'email@example.com'}
        error={fieldErrors['email']}
      />
      <InputUncontrolled
        label={'password'}
        password={false}
        placeholder={'1Ws!'}
        error={fieldErrors['password']}
      />
      <InputUncontrolled
        label={'password confirmation'}
        password={false}
        placeholder={'1Ws!'}
        error={fieldErrors['password confirmation']}
      />
      <InputUncontrolled
        label={'gender'}
        password={false}
        error={fieldErrors['gender']}
      />
      <InputUncontrolled
        label={'accept Terms and Conditions'}
        password={false}
        error={fieldErrors['accept Terms and Conditions']}
      />
      <InputUncontrolled
        label={'upload file'}
        password={false}
        error={fieldErrors['upload file']}
      />
      <SelectUncontrolled />
      <button type="submit" ref={submitRef} className={styles.submit}>
        Submit
      </button>
    </form>
  );
}

type UncontrolledFormProps = {
  closeWindow: () => void;
  whichOpen: string;
};
function getFieldErrors(zodError: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of zodError.issues) {
    const firstPath = issue.path[0];
    const fieldName = typeof firstPath === 'string' ? firstPath : null;

    if (fieldName) {
      errors[fieldName] = issue.message;
    }
  }

  return errors;
}
export interface FieldError {
  field: string;
  message: string;
}
