import { Controller, useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { effectFunction } from '../../utils/useEffectFunction.ts';
import { InputControlled } from './Elements/InputControlled.tsx';
import styles from '../../styles/form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { setSubmittedData } from '../../store/slice/controlledSlice.ts';
import {
  fullSchema,
  type FullSchemaData,
} from '../../utils/schema/baseSchema.ts';
import { useDispatch } from 'react-redux';
import { AutocompleteCountry } from './Elements/AutocompleteCountry/AutocompleteCountry.tsx';

export function ControlledForm({
  closeWindow,
  whichOpen,
}: ControlledFormProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
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
  const onSubmit = async (data: FullSchemaData) => {
    try {
      let fileData = null;
      if (data['upload file']?.[0]) {
        const file = data['upload file'][0];
        const base64 = await toBase64(file);
        fileData = {
          base64,
          fileName: file.name,
          fileType: file.type,
        };
      }
      const cleanedData = {
        ...data,
        ['upload file']: fileData,
      };
      dispatch(setSubmittedData(cleanedData));

      closeWindow();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <AutocompleteCountry
            label="Country"
            id="country"
            value={field.value || ''}
            onChange={field.onChange}
            error={errors.country?.message || ''}
          />
        )}
      />
      <button
        type="submit"
        ref={submitRef}
        className={styles.submit}
        disabled={Object.keys(errors).length > 0}
      >
        Submit
      </button>
    </form>
  );
}
type ControlledFormProps = {
  closeWindow: () => void;
  whichOpen: string;
};
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
