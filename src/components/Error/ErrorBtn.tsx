export function ErrorBtn({onClick}: ErrorBtnProps ): React.ReactElement {
  return (
    <>
      <button onClick={onClick}>Error</button>
    </>
  );
}
interface ErrorBtnProps {
  onClick: () => void;
}