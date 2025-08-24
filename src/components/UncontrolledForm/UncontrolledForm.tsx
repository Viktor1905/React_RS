import { type FormEvent, useEffect, useRef, useState } from 'react';
import { effectFunction } from '../../utils/useEffectFunction.ts';
import { InputUncontrolled } from './Elements/InputUncontrolled.tsx';
import styles from '../../styles/form.module.css';
import { fullSchema } from '../../utils/schema/baseSchema.ts';
import { z, ZodError } from 'zod';
import { AutocompleteCountry } from './Elements/AutocompleteCountry/AutocompleteCountry.tsx';
import { useDispatch } from 'react-redux';
import { setSubmittedUncontrolledData } from '../../store/slice/uncontrolledSlice.ts';
import { toBase64 } from '../../utils/toBase64.ts';

export function UncontrolledForm({
  closeWindow,
  whichOpen,
}: UncontrolledFormProps) {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  useEffect(
    () => effectFunction('uncontrolled', modalRef, closeWindow, whichOpen),
    [whichOpen, closeWindow]
  );
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const files = formData
      .getAll('upload file')
      .filter((f): f is File => f instanceof File);
    const normalized = {
      ...data,
      gender: data.gender || '',
      age: data.age,
      'accept Terms and Conditions':
        data['accept Terms and Conditions'] === 'on',
      'upload file': files,
    };

    try {
      const validatedData = fullSchema.parse(normalized);
      let fileData = null;
      if (normalized['upload file']?.[0]) {
        const file = normalized['upload file'][0];
        const fileInfo = await toBase64(file);
        fileData = {
          base64: fileInfo.base64,
          fileName: file.name,
          fileType: file.type,
        };
      }
      const cleanedData = {
        ...validatedData,
        ['upload file']: fileData,
      };
      closeWindow();
      dispatch(setSubmittedUncontrolledData(cleanedData));
      return { success: true, data: cleanedData };
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
    <form
      onSubmit={submit}
      ref={modalRef}
      className={styles.form}
      data-testid="uncontrolled-form"
    >
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
      <AutocompleteCountry
        label="Country"
        id="country"
        name="country"
        defaultValue=""
        error={fieldErrors['country']}
      />
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
