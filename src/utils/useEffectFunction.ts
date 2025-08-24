import { onKeyDown } from './keydownListener.ts';
import { mouseListener } from './mouseListener.ts';
import type { RefObject } from 'react';

export function effectFunction(
  type: string,
  modal: RefObject<HTMLFormElement | null>,
  closeWindow: () => void,
  whichOpen: string
) {
  if (whichOpen !== type) {
    return;
  }
  if (!modal.current) {
    return;
  }
  const focusableEls = Array.from(
    modal.current.querySelectorAll<HTMLElement>(
      'input, textarea, select, button'
    )
  );
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];
  firstEl.focus();
  const handleKeyDown = (event: KeyboardEvent) => {
    onKeyDown({
      event,
      closeWindow,
      focusableEls,
      firstEl,
      lastEl,
    });
  };

  const handleClick = (event: MouseEvent) => {
    mouseListener(event, modal.current, closeWindow);
  };
  if (modal.current) {
    modal.current.focus();
  }
  const timer = setTimeout(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    document.body.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, 0);
  return () => {
    document.body.removeEventListener('keydown', handleKeyDown);
    document.body.removeEventListener('click', handleClick);
    clearTimeout(timer);
  };
}
