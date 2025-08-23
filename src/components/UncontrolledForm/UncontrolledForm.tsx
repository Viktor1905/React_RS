import { useEffect, useRef } from 'react';
import { effectFunction } from '../../utils/useEffectFunction.ts';

export function UncontrolledForm({
  closeWindow,
  whichOpen,
}: UncontrolledFormProps) {
  const lastInput = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  useEffect(
    () => effectFunction('uncontrolled', modalRef, closeWindow, whichOpen),
    [whichOpen, closeWindow]
  );
  return (
    <div role="dialog">
      <form onSubmit={closeWindow} ref={modalRef}>
        <label>Test</label>
        <input></input>
        <label>Test uncontrolled</label>
        <input ref={lastInput}></input>
        <button type="submit" ref={submitRef}>
          Close
        </button>
      </form>
    </div>
  );
}

type UncontrolledFormProps = {
  closeWindow: () => void;
  whichOpen: string;
};
