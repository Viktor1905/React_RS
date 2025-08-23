export function onKeyDown({
  event,
  closeWindow,
  firstEl,
  focusableEls,
  lastEl,
}: onKeyDownArguments) {
  if (event.key === 'Escape') {
    closeWindow();
  }
  if (event.key === 'Tab' && focusableEls.length) {
    if (event.shiftKey) {
      if (document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }
  }
}
type onKeyDownArguments = {
  event: KeyboardEvent;
  closeWindow: () => void;
  focusableEls: HTMLElement[];
  firstEl: HTMLElement;
  lastEl: HTMLElement;
};
