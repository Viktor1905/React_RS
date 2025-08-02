import { type ReactElement, useState } from 'react';

export function ErrorBtn(): ReactElement {
  const [state, setState] = useState(false);
  function triggerError(): void {
    setState(true);
  }
  if (state) {
    throw new Error('Test error from the button!');
  }
  return (
    <>
      <button style={{ marginTop: '20px' }} onClick={() => triggerError()}>
        Error
      </button>
    </>
  );
}
