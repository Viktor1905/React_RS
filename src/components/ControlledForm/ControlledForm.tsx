import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { effectFunction } from '../../utils/useEffectFunction.ts';

export function ControlledForm({
  closeWindow,
  whichOpen,
}: ControlledFormProps) {
  const { handleSubmit } = useForm();
  const modalRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  useEffect(
    () => effectFunction('controlled', modalRef, closeWindow, whichOpen),
    [whichOpen, closeWindow]
  );
  return (
    <form onSubmit={handleSubmit(closeWindow)} ref={modalRef}>
      <label>Test</label>
      <input></input>
      <label>Test controlled</label>
      <input></input>
      <button type="submit" ref={submitRef}>
        Close
      </button>
    </form>
  );
}

type ControlledFormProps = {
  closeWindow: () => void;
  whichOpen: string;
};
