import { Component, type ReactElement } from 'react';
interface ErrorBtnState {
  shouldThrow: boolean;
}
export class ErrorBtn extends Component<object, ErrorBtnState> {
  state: ErrorBtnState = {
    shouldThrow: false,
  };

  triggerError = (): void => {
    this.setState({ shouldThrow: true });
  };
  render(): ReactElement {
    if (this.state.shouldThrow) {
      throw new Error('Test error from the button!');
    }
    return (
      <>
        <button style={{ marginTop: '20px' }} onClick={() => this.triggerError()}>Error</button>
      </>
    );
  }
}
