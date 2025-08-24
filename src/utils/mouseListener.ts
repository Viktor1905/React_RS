export function mouseListener(
  event: MouseEvent,
  modal: HTMLFormElement | null,
  closeWindow: () => void
) {
  if (!modal) {
    return;
  }
  if (!modal.contains(event.target as Node)) {
    closeWindow();
  }
}
